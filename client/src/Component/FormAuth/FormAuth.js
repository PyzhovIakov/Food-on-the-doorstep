import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default function FormAuth(props){

    return (
        <Stack
            direction="column"
            justifyContent="center"
            spacing={3}
            sx={{width:'35%'}}
        >
            <h1>{props.formTitle}</h1>
            {
                props.textFields.map((textField, index)=>(
                    <TextField
                        required
                        key={index}
                        id={textField.id}
                        label={textField.label}
                        type={textField.type}
                        name={textField.name}
                        onChange={props.onChangeTextFields}
                    />
                ))
            }
            <Button 
                variant="contained" 
                size="large"  
                color="success" 
                onClick={props.buttononClick} 
                disabled={props.buttonodisabled}
            >
               {props.buttonTitle}
            </Button>
        </Stack>
    );
}