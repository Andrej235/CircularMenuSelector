import { useEffect, useMemo, useRef } from 'react';
import './CircularMenu.scss';

type CircularMenuProps = {
    selectedItemId: number,
    items: string[] | number[],
    scale: number,
    onItemSelected: (selectedItemId: number) => void
}

/**
 * This function renders a circular menu component. It takes in the props for the component,
 * which include the index of the currently selected item, an array of items to display in the menu,
 * and a callback function when an item is selected.
 *
 * @param {CircularMenuProps} props - The props for the component.
 * @param {CircularMenuProps} props.selectedItemId - The index of the currently selected item.
 * @param {Array<string | number>} props.items - The items to display in the menu.
 * @param {(selectedItemId: number) => void} props.onItemSelected - The callback function when an item is selected.
 * @returns {JSX.Element} The rendered circular menu.
 */
export default function CircularMenu({ selectedItemId, items, scale, onItemSelected }: CircularMenuProps): JSX.Element {
    // Calculate the number of degrees to rotate each menu item. This value is determined by dividing 360 degrees by the total number of items.
    const rotationPerItem: number = 360 / 30;
    // Create a mutable reference to store the previous rotation value. This is used to compare with the current rotation and adjust the menu rotation if necessary.
    const previousRotation: React.MutableRefObject<number> = useRef<number>(0);

    const menuWrapperRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    // Calculate the rotation value for the menu. This is done by multiplying the selected item ID by the rotation per item, and then adjusting the value if necessary to avoid sudden jumps in the menu rotation.
    const rotation: number = useMemo(() => {
        let menuRotation: number = rotationPerItem * (14 - selectedItemId);

        // If the difference between the current rotation and the previous rotation is greater than 180 degrees, adjust the menu rotation accordingly to avoid sudden jumps.
        if (Math.abs(menuRotation - previousRotation.current) > 180)
            menuRotation += menuRotation > previousRotation.current ? -360 : 360;

        // Update the previous rotation value with the current menu rotation.
        previousRotation.current = menuRotation;
        return menuRotation;
    }, [selectedItemId, rotationPerItem]);

    // Render the circular menu.
    return (
        <div className="circular-menu-wrapper" ref={menuWrapperRef}>
            {/* The menu itself */}
            <ul className="menu" ref={menuRef} style={{
                transform: `rotate(${rotation}deg)`, // Rotate the menu based on the calculated rotation
                scale: `${scale}`
            }}>
                {renderElement()} {/* Render the menu elements */}
            </ul>
        </div>
    );

    /**
     * Render the menu elements.
     *
     * @returns {Array<JSX.Element>} The array of rendered menu elements.
     */
    function renderElement(): Array<JSX.Element> {
        // Map over each item in the items array and render a menu element for each one.
        return (
            items.map((x: string | number, i: number) => {
                // Determine the CSS class for the element based on whether or not it is the selected item.
                const className: string = `menu-item ${i === selectedItemId ? 'selected' : ''}`;
                // Calculate the rotation for the text based on the rotation per item, the index of the item, and the calculated rotation.
                const textRotation: number = (-rotationPerItem * (i + 1)) + 675 - rotation;

                // Render the menu element and apply the calculated rotation to the text.
                return <li className={className} data-text={x} key={x}
                    style={{
                        '--text-rotation': `${textRotation}deg`
                    } as React.CSSProperties}
                    onClick={() => selectItem(i)}>
                </li>
            })
        );

        /**
         * Callback function when an item is selected. Calls the onItemSelected callback with the index of the selected item.
         *
         * @param {number} i - The index of the selected item.
         */
        function selectItem(i: number): void {
            onItemSelected(i); // Call the onItemSelected callback with the selected item index
        }
    }
}