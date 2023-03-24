import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LinearProgress from '@mui/material/LinearProgress'

export default function FormAuth(props){
    return (
        <> 
            {props.buttonLoading? <LinearProgress color="success" />:null}  
            <Stack
                direction="column"
                justifyContent="center"
                spacing={3}
                sx={{width:'35%', margin:'20px auto', boxShadow: 3, padding:'10px 20px 20px',borderRadius:'15px'}}
            >
                
                <h1 style={{margin:0, padding:0}}>{props.formTitle}</h1>
                {
                    props.viewSelectRole?
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
                            sx={{borderRadius:'15px'}}
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
                    disabled={props.buttonLoading}
                >
                {props.buttonTitle}
                </Button>
            </Stack>
        </>
    );
}