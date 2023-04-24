exports.Config = {
    title:"Plinth",
    ID:{
        page:"page_container",
        stage:"capp_container",
        header:"header_container",
        footer:"footer_container",
        dockFooter:"dock_footer",
        dock:"dock_container",
    },
    template:"page",                //template folder
    pages:{
        account:true,
        server:true,
        publish:true,
        setting:true,
    },
    map:{
        favs:"fav_queue",
        data:"fav_map",
    },
    //network interaction
    node:"ws://127.0.0.1:9944",
    recommand:"plinth_recommand",       //anchor name which store the recommand list
};