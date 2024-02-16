import { useCustomization } from '../context/Customization.tsx'

const Configurator = () => {

    const { length,
        setLength,
        diameter,
        setDiameter,
        number,
        setNumber,
        radius,
        setRadius,
        batterAngle,
        setBatterAngle,
        numHelices,
        setNumHelices,
        firstHelixDistFromBottom,
        setFirstHelixDistFromBottom,
        helixSpacing,
        setHelixSpacing,
        helixDiameter,
        setHelixDiameter,
    } = useCustomization();

    return (
        <div className="configurator">
            {/* Pile Information  */}
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

                <div className={`item ${number === 5 ? 'item--active' : ""}`} onClick={() => setNumber(5)}>
                    <div className="item__label">
                        5
                    </div>
                </div>

                <div className={`item ${number === 6 ? 'item--active' : ""}`} onClick={() => setNumber(6)}>
                    <div className="item__label">
                        6
                    </div>
                </div>

                <div className={`item ${number === 7 ? 'item--active' : ""}`} onClick={() => setNumber(7)}>
                    <div className="item__label">
                        7
                    </div>
                </div>

                <div className={`item ${number === 8 ? 'item--active' : ""}`} onClick={() => setNumber(8)}>
                    <div className="item__label">
                        8
                    </div>
                </div>


                <div className={`item ${number === 9 ? 'item--active' : ""}`} onClick={() => setNumber(9)}>
                    <div className="item__label">
                        9
                    </div>
                </div>


                <div className={`item ${number === 10 ? 'item--active' : ""}`} onClick={() => setNumber(10)}>
                    <div className="item__label">
                        10
                    </div>
                </div>


                <div className={`item ${number === 11 ? 'item--active' : ""}`} onClick={() => setNumber(11)}>
                    <div className="item__label">
                        11
                    </div>
                </div>


                <div className={`item ${number === 12 ? 'item--active' : ""}`} onClick={() => setNumber(12)}>
                    <div className="item__label">
                        12
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

            {/* Batter Angle */}
            <div className="configurator__section__title">
                Batter Angle
            </div>
            <div className="configurator__section__options">
                <div className={`item ${batterAngle === 0 ? 'item--active' : ""}`} onClick={() => setBatterAngle(0)}>
                    <div className="item__label">
                        0deg
                    </div>
                </div>
                <div className={`item ${batterAngle === 5 ? 'item--active' : ""}`} onClick={() => setBatterAngle(5)}>
                    <div className="item__label">
                        5deg
                    </div>
                </div>
                <div className={`item ${batterAngle === 10 ? 'item--active' : ""}`} onClick={() => setBatterAngle(10)} >
                    <div className="item__label">
                        10deg
                    </div>
                </div>
                <div className={`item ${batterAngle === 15 ? 'item--active' : ""}`} onClick={() => setBatterAngle(15)}>
                    <div className="item__label">
                        15deg
                    </div>
                </div>

                <div className={`item ${batterAngle === 30 ? 'item--active' : ""}`} onClick={() => setBatterAngle(30)}>
                    <div className="item__label">
                        30deg
                    </div>
                </div>

                <div className={`item ${batterAngle === 45 ? 'item--active' : ""}`} onClick={() => setBatterAngle(45)}>
                    <div className="item__label">
                        45deg
                    </div>
                </div>

                <div className={`item ${batterAngle === 90 ? 'item--active' : ""}`} onClick={() => setBatterAngle(90)}>
                    <div className="item__label">
                        90deg
                    </div>
                </div>
            </div >

            {/* Helix Information  */}
            {/* Num Helices */}
            <div className="configurator__section__title">
                Number of Helices
            </div>
            <div className="configurator__section__options">
                <div className={`item ${numHelices === 1 ? 'item--active' : ""}`} onClick={() => setNumHelices(1)}>
                    <div className="item__label">
                        1
                    </div>
                </div>
                <div className={`item ${numHelices === 2 ? 'item--active' : ""}`} onClick={() => setNumHelices(2)} >
                    <div className="item__label">
                        2
                    </div>
                </div>
                <div className={`item ${numHelices === 3 ? 'item--active' : ""}`} onClick={() => setNumHelices(3)}>
                    <div className="item__label">
                        3
                    </div>
                </div>
                <div className={`item ${numHelices === 4 ? 'item--active' : ""}`} onClick={() => setNumHelices(4)}>
                    <div className="item__label">
                        4
                    </div>
                </div>

                <div className={`item ${numHelices === 5 ? 'item--active' : ""}`} onClick={() => setNumHelices(5)}>
                    <div className="item__label">
                        5
                    </div>
                </div>

            </div >

            {/* First Helix Distance from Bottom */}
            <div className="configurator__section__title">
                First Helix Distance from Bottom
            </div>
            <div className="configurator__section__options">
                <div className={`item ${firstHelixDistFromBottom === 0.25 ? 'item--active' : ""}`} onClick={() => setFirstHelixDistFromBottom(0.25)}>
                    <div className="item__label">
                        0.25m
                    </div>
                </div>
                <div className={`item ${firstHelixDistFromBottom === 0.5 ? 'item--active' : ""}`} onClick={() => setFirstHelixDistFromBottom(0.5)} >
                    <div className="item__label">
                        0.5m
                    </div>
                </div>
                <div className={`item ${firstHelixDistFromBottom === 1 ? 'item--active' : ""}`} onClick={() => setFirstHelixDistFromBottom(1)}>
                    <div className="item__label">
                        1m
                    </div>
                </div>
            </div >

            {/* Helix Spacing */}
            <div className="configurator__section__title">
                Helix Spacing
            </div>
            <div className="configurator__section__options">
                <div className={`item ${helixSpacing === 0.5 ? 'item--active' : ""}`} onClick={() => setHelixSpacing(0.5)}>
                    <div className="item__label">
                        0.5m
                    </div>
                </div>
                <div className={`item ${helixSpacing === 1 ? 'item--active' : ""}`} onClick={() => setHelixSpacing(1)} >
                    <div className="item__label">
                        1m
                    </div>
                </div>
                <div className={`item ${helixSpacing === 1.5 ? 'item--active' : ""}`} onClick={() => setHelixSpacing(1.5)}>
                    <div className="item__label">
                        1.5m
                    </div>
                </div>

                <div className={`item ${helixSpacing === 2.0 ? 'item--active' : ""}`} onClick={() => setHelixSpacing(2.0)}>
                    <div className="item__label">
                        2.0m
                    </div>
                </div>

                <div className={`item ${helixSpacing === 2.5 ? 'item--active' : ""}`} onClick={() => setHelixSpacing(2.5)}>
                    <div className="item__label">
                        2.5m
                    </div>
                </div>

                <div className={`item ${helixSpacing === 3.0 ? 'item--active' : ""}`} onClick={() => setHelixSpacing(3.0)}>
                    <div className="item__label">
                        3.0m
                    </div>
                </div>

                <div className={`item ${helixSpacing === 3.5 ? 'item--active' : ""}`} onClick={() => setHelixSpacing(3.5)}>
                    <div className="item__label">
                        3.5m
                    </div>
                </div>
            </div >

            {/* Helix Diameter */}
            <div className="configurator__section__title">
                Helix Diameter
            </div>
            <div className="configurator__section__options">
                <div className={`item ${helixDiameter === 1.25 ? 'item--active' : ""}`} onClick={() => setHelixDiameter(1.25)}>
                    <div className="item__label">
                        1.25m
                    </div>
                </div>
                <div className={`item ${helixDiameter === 2.25 ? 'item--active' : ""}`} onClick={() => setHelixDiameter(2.25)} >
                    <div className="item__label">
                        2.25m
                    </div>
                </div>
                <div className={`item ${helixDiameter === 3.25 ? 'item--active' : ""}`} onClick={() => setHelixDiameter(3.25)}>
                    <div className="item__label">
                        3.25m
                    </div>
                </div>
            </div >

        </div >
    )
}

export default Configurator