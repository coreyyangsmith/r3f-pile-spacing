import { useCustomization } from '../context/Customization.tsx'

const Configurator = () => {

    const { length,
        setLength,
        diameter,
        setDiameter } = useCustomization();

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

            {/* Pile Width */}
            <div className="configurator__section__title">
                Pile Width
            </div>
            <div className="configurator__section__options">
                <div className={`item ${length === 1 ? 'item--active' : ""}`} onClick={() => setDiameter(1)}>
                    <div className="item__label">
                        1m
                    </div>
                </div>
                <div className={`item ${length === 22 ? 'item--active' : ""}`} onClick={() => setDiameter(2)} >
                    <div className="item__label">
                        2m
                    </div>
                </div>
                <div className={`item ${length === 3 ? 'item--active' : ""}`} onClick={() => setDiameter(3)}>
                    <div className="item__label">
                        3m
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Configurator