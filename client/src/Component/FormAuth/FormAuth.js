import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
                props.viewSelect?
                        (<FormControl>
                        <InputLabel id="demo-simple-select-label">Роль</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Роль"
                            name="role"
                            value={props.formValue.role}
                            onChange={props.onChangeTextFields}
                        >
                            <MenuItem value={'user'}>Клиент</MenuItem>
                            <MenuItem value={'manager'}>Менеджер</MenuItem>
                            <MenuItem value={'admin'}>Администратор</MenuItem>
                        </Select>
                    </FormControl>):null
            }
            {
                props.textFields.map((textField, index)=>(
                    <TextField
                        required
                        key={index}
                        id={textField.id}
                        label={textField.label}
                        type={textField.type}
                        name={textField.name}
                        value={props.formValue[textField.name]}
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