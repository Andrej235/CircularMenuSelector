import { CSSProperties } from 'react';
import './CircularMenu.scss';

type CircularMenuProps = {
    selectedItemId: number,
    items: string[] | number[],
    onItemSelected: (selectedItemId: number) => void
}

export default function CircularMenu({ selectedItemId, items, onItemSelected }: CircularMenuProps) {
    const rotationPerItem = 360 / 30;
    const menuRotation = (rotationPerItem * (14 - selectedItemId))

    return (
        <div className="circular-menu-wrapper">
            <ul className="menu" style={
                {
                    transform: `rotate(${menuRotation}deg)`
                }
            }>
                {renderElement()}
            </ul>
        </div>
    )

    function renderElement(): JSX.Element[] {
        return (
            items.map((x, i) => {
                const className = `menu-item ${i === selectedItemId ? 'selected' : ''}`;
                const textRotation = (-rotationPerItem * (i + 1)) + 675 - menuRotation;

                return <li className={className} data-text={x} key={x}
                    style={
                        {
                            '--text-rotation': `${textRotation}deg`
                        } as CSSProperties
                    }
                    onClick={() => onItemSelected(i)}>

                </li>
            })
        );
    }
}
