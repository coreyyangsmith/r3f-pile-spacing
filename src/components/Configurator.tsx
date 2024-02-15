import { useCustomization } from '../context/Customization.tsx'

const Configurator = () => {

    const { length,
        setLength,
        diameter,
        setDiameter,
        number,
        setNumber,
        radius,
        setRadius } = useCustomization();

    return (
        <div className="configurator">
            {/* Pile Length */}
            <div className="configurator__section__title">
                Pile Length
            </div>
            <div className="configurator__section__options">
                <div className={`item ${length === 10 ? 'item--active' : ""}`} onClick={() => setLength(10)}>
                    <div className="item__label">
                        10m
                    </div>
                </div>
                <div className={`item ${length === 15 ? 'item--active' : ""}`} onClick={() => setLength(15)} >
                    <div className="item__label">
                        15m
                    </div>
                </div>
                <div className={`item ${length === 20 ? 'item--active' : ""}`} onClick={() => setLength(20)}>
                    <div className="item__label">
                        20m
                    </div>
                </div>
            </div >

            {/* Pile Diameter */}
            <div className="configurator__section__title">
                Pile Diameter
            </div>
            <div className="configurator__section__options">
                <div className={`item ${diameter === 1 ? 'item--active' : ""}`} onClick={() => setDiameter(1)}>
                    <div className="item__label">
                        1m
                    </div>
                </div>
                <div className={`item ${diameter === 2 ? 'item--active' : ""}`} onClick={() => setDiameter(2)} >
                    <div className="item__label">
                        2m
                    </div>
                </div>
                <div className={`item ${diameter === 3 ? 'item--active' : ""}`} onClick={() => setDiameter(3)}>
                    <div className="item__label">
                        3m
                    </div>
                </div>
            </div >

            {/* Number */}
            <div className="configurator__section__title">
                Pile Number
            </div>
            <div className="configurator__section__options">
                <div className={`item ${number === 1 ? 'item--active' : ""}`} onClick={() => setNumber(1)}>
                    <div className="item__label">
                        1
                    </div>
                </div>
                <div className={`item ${number === 2 ? 'item--active' : ""}`} onClick={() => setNumber(2)} >
                    <div className="item__label">
                        2
                    </div>
                </div>
                <div className={`item ${number === 3 ? 'item--active' : ""}`} onClick={() => setNumber(3)}>
                    <div className="item__label">
                        3
                    </div>
                </div>
                <div className={`item ${number === 4 ? 'item--active' : ""}`} onClick={() => setNumber(4)}>
                    <div className="item__label">
                        4
                    </div>
                </div>

            </div >

            {/* Radius */}
            <div className="configurator__section__title">
                Spacing Radius
            </div>
            <div className="configurator__section__options">
                <div className={`item ${radius === 1 ? 'item--active' : ""}`} onClick={() => setRadius(1)}>
                    <div className="item__label">
                        1m
                    </div>
                </div>
                <div className={`item ${radius === 2 ? 'item--active' : ""}`} onClick={() => setRadius(2)} >
                    <div className="item__label">
                        2m
                    </div>
                </div>
                <div className={`item ${radius === 3 ? 'item--active' : ""}`} onClick={() => setRadius(3)}>
                    <div className="item__label">
                        3m
                    </div>
                </div>
            </div >

        </div >
    )
}

export default Configurator