import { clone, orderBy, sumBy } from "lodash/fp";

export function byCenterTotalDoses(centers, sortOrder) {
    return orderBy(
        (center) =>
            sumBy((session) => session.available_capacity, center.sessions),
        sortOrder,
        centers
    );
}

export function bySessionDoses(centers, sortOrder) {
    let nextCenters = [];
    centers.forEach((center) => {
        let nextCenter = clone(center);
        nextCenter.sessions = orderBy(
            ["available_capacity_dose1", "available_capacity_dose2"],
            sortOrder,
            center.sessions
        );
        nextCenters.push(nextCenter);
    });
    return nextCenters;
}
