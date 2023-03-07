const MenuUserRoleController= (Role)=>{
    if(Role==='user'){
        return([ 
            {to:'/catalog', text:'Меню'},
            {to:'/contacts', text:'Контакты'},
            {to:'/basket', text:'Корзина'},
            {to:'/profile', text:'Профиль'}      
        ]);
    }
    if(Role==='manager'){
        return([  
            {to:'/catalog', text:'Меню'},
            {to:'/orders', text:'Заказы'},
            {to:'/contacts', text:'Контакты'},
            {to:'/profile', text:'Профиль'}      
        ]);
    }
    return([ 
        {to:'/catalog', text:'Меню'},
        {to:'/contacts', text:'Контакты'},
        {to:'/basket', text:'Корзина'},
        {to:'/login', text:'Авторизация'},
        {to:'/regis', text:'Регистрация'}     
    ]);
}
export default MenuUserRoleController