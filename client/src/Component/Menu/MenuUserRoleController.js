const MenuUserRoleController= (Role)=>{
    if(Role==='user'){
        return([ 
            {to:'/',text:'Главная'},
            {to:'/catalog', text:'Меню'},
            {to:'/contacts', text:'Контакты'},
            {to:'/basket', text:'Корзина'},
            {to:'/profile', text:'Профиль'}      
        ]);
    }
    return([ 
        {to:'/',text:'Главная'},
        {to:'/catalog', text:'Меню'},
        {to:'/contacts', text:'Контакты'},
        {to:'/basket', text:'Корзина'},
        {to:'/login', text:'Авторизация'},
        {to:'/regis', text:'Регистрация'}     
    ]);
}
export default MenuUserRoleController