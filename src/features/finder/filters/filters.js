import { filter, some, clone, flow, partialRight, pickBy } from "lodash/fp";
import { byCenterTotalDoses as sortByCenterTotalDoses } from "../sorting/sorting";

export function isFree(centers) {
    return filter((center) => center.fee_type === "Free", centers);
}

export function isPaid(centers) {
    return filter((center) => center.fee_type === "Paid", centers);
}

export function byVaccine(centers, vaccines) {
    let filteredCenters = filter((center) => {
        return some(
            (session) => vaccines.includes(session.vaccine),
            center.sessions
        );
    }, centers);
    let newCenters = [];
    filteredCenters.forEach((center) => {
        let newCenter = clone(center);
        newCenter.sessions = filter(
            (session) => vaccines.includes(session.vaccine),
            center.sessions
        );
        newCenters.push(newCenter);
    });
    return newCenters;
}

export function byKeyword(centers, keywords) {
    return filter((center) => {
        const target = [
            center.center_id.toString(),
            center.name,
            center.address,
            center.block_name,
        ]
            .join(" ")
            .toLowerCase();
        return some((el) => target.indexOf(el.toLowerCase()) >= 0, keywords);
    }, centers);
}

export function byAge(centers, ages) {
    const { minAge, maxAge } = ages;
    if (!minAge && !maxAge) {
        return centers;
    }
    let filteredCenters = filter((center) => {
        return some((session) => {
            if (minAge && maxAge) {
                return (
                    session.min_age_limit >= minAge &&
                    session.max_age_limit <= maxAge
                );
            } else if (minAge && !maxAge) {
                return session.min_age_limit >= minAge;
            } else if (!minAge && maxAge) {
                return session.max_age_limit <= maxAge;
            }
        }, center.sessions);
    }, centers);
    let newCenters = [];
    filteredCenters.forEach((center) => {
        let newCenter = clone(center);
        newCenter.sessions = filter((session) => {
            if (minAge && maxAge) {
                return (
                    session.min_age_limit >= minAge &&
                    session.max_age_limit <= maxAge
                );
            } else if (minAge && !maxAge) {
                return session.min_age_limit >= minAge;
            } else if (!minAge && maxAge) {
                return session.max_age_limit >= minAge;
            }
        }, center.sessions);
        newCenters.push(newCenter);
    });
    return newCenters;
}

/* 
A terribly specific function for helping the byAgeCategory filter function.
Works for now, since there are only 3 age categories, hence only 6+1 combinaions are possible.
Takes an array of age values, array containing "min_age" and "max_age" and then uses
the join array to determine whether to AND (join: true) or to OR (join: false) the conditions.
*/
function combineMultipleAgeConditions(session, ages, filterFields, joins) {
    let val1 = joins[0]
        ? session[filterFields[0]] === ages[0] &&
          session[filterFields[1]] === ages[1]
        : session[filterFields[0]] === ages[0] ||
          session[filterFields[1]] === ages[1];
    if (ages.length === 2) {
        return val1;
    }
    // Currently, three conditional checks are only required when 18+ and 45+ is checked
    // to filter out the 18-44 slots. Hence, note that the statements are using the unequal sign.
    if (ages.length === 3) {
        return joins[1]
            ? val1 && session[filterFields[2]] !== ages[2]
            : val1 || session[filterFields[2]] !== ages[2];
    }
    return false;
}

/* 
Filters age by category, the if-else conditions determine what minimum and maximum values
to use for filtering depending on the categories selected (values array). 
Since multiple, disconnected ranges like 18+ and 45+ can be checked by the user, a helper 
function which can take multiple min. or max. values and other parameters is used.
*/
export function byAgeCategory(centers, categories) {
    const {
        eighteenAbove: fifteenAbove,
        eighteenFortyFour,
        fortyFiveAbove,
    } = categories;
    let values, filterFields, joins;
    let min = "min_age_limit";
    let max = "max_age_limit";
    if (fifteenAbove === eighteenFortyFour && fifteenAbove === fortyFiveAbove) {
        return centers;
    }
    if (fifteenAbove && eighteenFortyFour) {
        values = [15, 44];
        filterFields = [min, max];
        joins = [false];
    } else if (fifteenAbove && fortyFiveAbove) {
        // filter centers with:
        // (min = 18 OR min = 45) AND max != 44
        // a false in joins means OR, a true means AND
        // filter centers with:
        // (filterFields[0] = values[0] {joins[0]} filterFields[1] = values[1]) AND filterFields[2] != values[2]
        values = [15, 45, 44];
        filterFields = [min, min, max];
        joins = [false, true];
    } else if (eighteenFortyFour && fortyFiveAbove) {
        values = [45, 44];
        filterFields = [min, max];
        joins = [false];
    } else if (fifteenAbove) {
        values = [15, undefined];
        filterFields = [min, max];
        joins = [true];
    } else if (eighteenFortyFour) {
        values = [18, 44];
        filterFields = [min, max];
        joins = [true];
    } else if (fortyFiveAbove) {
        values = [45, undefined];
        filterFields = [min, max];
        joins = [true];
    } else {
        return centers;
    }

    let filteredCenters = filter((center) => {
        return some((session) => {
            return combineMultipleAgeConditions(
                session,
                values,
                filterFields,
                joins
            );
        }, center.sessions);
    }, centers);
    let newCenters = [];
    filteredCenters.forEach((center) => {
        let newCenter = clone(center);
        newCenter.sessions = filter((session) => {
            return combineMultipleAgeConditions(
                session,
                values,
                filterFields,
                joins
            );
        }, center.sessions);
        newCenters.push(newCenter);
    });
    return newCenters;
}

export const applyFilters = (centers, filters, sort) => {
    const { feeType, keywords, vaccines, ages } = filters;
    let transformations = [];
    if (feeType["Free"] !== feeType["Paid"]) {
        if (feeType["Free"]) {
            transformations.push(isFree);
        } else if (feeType["Paid"]) {
            transformations.push(isPaid);
        }
    }
    if (vaccines) {
        let selectedVaccines = pickBy((vaccine) => vaccine.checked, vaccines);
        let nextVaccines = [];
        Object.values(selectedVaccines).forEach((vaccine) =>
            nextVaccines.push(vaccine.name)
        );
        if (nextVaccines.length > 0) {
            transformations.push(partialRight(byVaccine, [nextVaccines]));
        }
    }
    if (ages) {
        transformations.push(partialRight(byAge, [ages]));
    }
    if (keywords.length > 0) {
        transformations.push(partialRight(byKeyword, [keywords]));
    }
    transformations.push(
        partialRight(sortByCenterTotalDoses, [[sort.center.totalDoses]])
    );
    // Sort slots within a center by dose count
    // transformations.push(partialRight(sortByDosesWithinCenter, [sort.session.doses]));
    // console.log(filters)
    return flow(transformations)(centers);
};
