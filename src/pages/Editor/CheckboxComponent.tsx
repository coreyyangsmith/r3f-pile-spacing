import { Checkbox, Stack, Typography } from '@mui/material'
import { dark6, primary6 } from '../../themes/Color';

type CheckboxComponentProps = {
    value: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    text: string,
}

const CheckboxComponent = (props: CheckboxComponentProps) => {

    return (
        <div style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            marginTop: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                <Checkbox
                    checked={props.value}
                    onChange={() => { props.setter(!props.value) }}
                    sx={{
                        color: '#FFFFFFab',
                        '&.Mui-checked': {
                            color: primary6,
                        },
                    }} />

                {props.value ?
                    <Typography
                        variant='body1'
                        style={{
                            color: dark6,
                        }}><b>{props.text}</b></Typography>
                    :
                    <Typography
                        variant='body1'
                        style={{
                            color: dark6,
                        }}>{props.text}</Typography>
                }

            </Stack>
        </div>
    )
}

export default CheckboxComponent