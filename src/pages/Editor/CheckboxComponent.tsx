import { useTheme } from '@emotion/react'
import { Checkbox, Stack, Typography } from '@mui/material'

type CheckboxComponentProps = {
    value: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    text: string,
}

const CheckboxComponent = (props: CheckboxComponentProps) => {
    const theme = useTheme();

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
                            color: theme.palette.primary6.main,
                        },
                    }} />

                {props.value ?
                    <Typography
                        variant='body1'
                        style={{
                            color: theme.palette.dark6.main,
                        }}><b>{props.text}</b></Typography>
                    :
                    <Typography
                        variant='body1'
                        style={{
                            color: theme.palette.dark6.main,
                        }}>{props.text}</Typography>
                }

            </Stack>
        </div>
    )
}

export default CheckboxComponent