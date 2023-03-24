const MenuUserRoleController= (Role)=>{
    if(Role==='user'){
        return([ 
            {to:'/catalog', text:'Меню'},
            {to:'/contacts', text:'Контакты'}    
        ]);
    }
    if(Role==='manager'){
        return([  
            {to:'/catalog', text:'Меню'},
            {to:'/orders', text:'Заказы'},
            {to:'/contacts', text:'Контакты'}     
        ]);
    }
    if(Role==='admin'){
        return([  
            {to:'/contacts', text:'Контакты'},     
            {to:'/catalog', text:'Меню'},
            {to:'/statistics', text:'Статистика'},
            {to:'/accounts', text:'Учетки'}      
        ]);
    }
    return([ 
        {to:'/catalog', text:'Меню'},
        {to:'/contacts', text:'Контакты'},
        {to:'/login', text:'Авторизация'},
        {to:'/regis', text:'Регистрация'}     
    ]);
}
export default MenuUserRoleController