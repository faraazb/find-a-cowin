import React from "react";
import { Button, MenuItem } from "@blueprintjs/core";
import { Select2 } from "@blueprintjs/select";
import { Tooltip2 } from "@blueprintjs/popover2";

/*
 * Simple filtering function, extracted here so that it doesn't have to repeated in both
 * State and District Selectors
 *
 * */
const filterList = (query, title, _index, exactMatch) => {
    const normalizedTitle = title.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
        return normalizedTitle === normalizedQuery;
    } else {
        return normalizedTitle.indexOf(normalizedQuery) >= 0;
    }
};

const Selector = React.memo((props) => {
    const { setItem, selectedItem, items, label, id } = props;
    // const [selected, setSelected] = useState(selectedItem);

    const renderInputValue = (item) => item[label];

    // Handle State selector value change
    const onItemSelect = (item, _event) => {
        setItem(item);
    };

    // Render a Blueprintjs Menu Item for every state
    const renderItem = (item, { handleClick }) => {
        return (
            <MenuItem
                key={item[id]}
                text={item[label]}
                onClick={handleClick}
            />
        );
    };


    // Called by the {@link https://blueprintjs.com/docs/#select/select2 Blueprintjs Select} component whenever
    // the query has a new input keyword. Select will provide query,
    // the State item {state_name: string, state_id: string} the index and exactMatch.
    const filter = (query, item, index, exactMatch) => {
        return filterList(query, item[label], index, exactMatch);
    };

    return (
        <div className="slot-toolbar-item selector">
            <Select2
                fill={true}
                items={items}
                popoverProps={{
                    popoverClassName: "selector-popover",
                    minimal: true,
                }}
                inputValueRenderer={renderInputValue}
                itemRenderer={renderItem}
                onItemSelect={onItemSelect}
                itemPredicate={filter}
                noResults={<MenuItem disabled={true} text="No results." />}
            >
                <Tooltip2
                    content={<span>{selectedItem[label]}</span>}
                    openOnTargetFocus={false}
                    usePortal={false}
                >
                    <Button
                        fill={true}
                        text={selectedItem[label]}
                        rightIcon="caret-down"
                    />
                </Tooltip2>
            </Select2>
        </div>
    );
})

export { Selector };
