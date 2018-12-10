// Add character handler
const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#domoName").val() == '' || $("#domoAge").val() == ''){
        handleError("RAWR! All feilds are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function(){
        loadDomosFromServer();
    });

    return false;
};

// Return character search form
const DomoForm = (props) => {
    return ( 
        <form id="domoForm" name="domoForm" action="/maker" method="POST" className="domoForm" type="submit">
            <div id="searchCharacterName">
                <label for="name">Name: </label>
                <input id="domoName" type="text" name="name" placeholder="Character"/>
            </div>
            <div id="searchCharacterRealm">
                <label for="age">Realm: </label>
                <input id="domoAge" type="text" name="age" placeholder="Realm"/>
            </div>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Add Character" />
        </form>
    );
};

// Return character list 
const DomoList = function(props) {
    if(props.domos.length === 0){
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yeet</h3>
            </div>
        );
    };

    const domoNodes = props.domos.map(function(domo) {
        return (
            <li className="character" key={domo._id}>
                <div className="imgDiv">
                <img src={`http://render-us.worldofwarcraft.com/character/${domo.icon}`} alt="domo face" className="domoFace"/>
                </div>
                <div className="textDiv">
                
                <h3 className="characterName" className={domo.class}>{domo.name}<input onClick={() => setupCharacter(domo.name, domo.age)} type="radio" name="radio" id={domo.name} value={domo.age}/></h3>
                <h3 className="characterLevel">{domo.age}</h3>
                </div>
            </li>
        );
    });

    return (
        <div className="domoList">
            <ul>
                {domoNodes}
            </ul>
        </div>
    );
};

// load characters from server2
const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
};

// handle search for character content
const handleSearch = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if($("#user").val() == '' || $("#pass").val() == ''){
        handleError("RAWR!! cannot search");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    //sendAjax('POST', $("#characterInfoContent").attr("action"), $("#characterInfoContent").serialize(), redirect);


    redirect({redirect:('/maker')});
    return false;
};
// FORM 1 ***
// Return overview form 1
const OverviewForm1 = (props) => {
    console.log('in overview form1');
    console.dir(props);
    return ( 
        /*
        <form id="domoForm" name="domoForm" action="/searchCharacter" method="POST" className="domoForm">
            
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Add Character" />
        </form>*/
        <form id="form1-character">
            <div id="form1-header" className="textDiv">
                <h2 id="form1-characterName" className="characterName" className={props.class}>Character Name</h2>
                <h3 id="form1-characterLevel" className="characterLevel">XXX CLASS</h3>
                <h3 id="form1-characterRealm" className="characterRealm">REALM</h3>
            </div>
            <div id="form1-image" className="imgDiv">
            </div> 
        </form>
    );
};

// render character overview form 1
const createOverview1 = (csrf) => {
    //sendAjax('POST', '/searchCharacter', null, (data) => {
        ReactDOM.render(
            <OverviewForm1 csrf={csrf} />, 
            document.querySelector("#characterInfoContent")
        );
    //});
};

// FORM 2 ***
// Return overview form 2
const OverviewForm2 = (props) => {
    return ( 
        <form id="domoForm" name="domoForm" action="/searchCharacter" method="POST" className="domoForm">
            <div id="searchCharacterName">
                <label for="name">Name: </label>
                <input id="domoName" type="text" name="name" placeholder="Character"/>  
            </div>
            
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Add Character" />
        </form>
    );
};

// render character overview form 2
const createOverview2 = (csrf) => {
    ReactDOM.render(
        <OverviewForm2 csrf={csrf} />,
        document.querySelector("#characterInfoContent")
    );
};

// FORM 3 ***
// Return overview form 3
const OverviewForm3 = (props) => {
    return ( 
        <form id="domoForm" name="domoForm" action="/searchCharacter" method="POST" className="domoForm">
            <div id="searchCharacterName">
                <label for="name">Name: </label>
                <input id="domoName" type="text" name="name" placeholder="Character"/>  
            </div>
            
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Add Character" />
        </form>
    );
};

// render character overview form 3
const createOverview3 = (csrf) => {
    ReactDOM.render(
        <OverviewForm3 csrf={csrf} />,
        document.querySelector("#characterInfoContent")
    );
};

// Render components: add character form, character list, overview, raid progression, pvp
const setup = function(csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#addCharacter")
    );

    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );

    const overviewBtn1 = document.querySelector("#overviewBtn1");
    const overviewBtn2 = document.querySelector("#overviewBtn2");
    const overviewBtn3 = document.querySelector("#overviewBtn3");

    overviewBtn1.addEventListener("click", (e) => {
        e.preventDefault();
        createOverview1(csrf);
        return false;
    });

    overviewBtn2.addEventListener("click", (e) => {
        //e.preventDefault();
        createOverview2(csrf);
       // return false;
    });

    overviewBtn3.addEventListener("click", (e) => {
        //e.preventDefault();
        createOverview3(csrf);
        //return false;
    });

    loadDomosFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});