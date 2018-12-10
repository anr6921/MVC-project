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
                
                <h3 className="characterName" className={domo.class}>{domo.name}<input onclick="radioClick()" type="radio" name="radio" id={domo.name} value={domo.age} /></h3>
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
        handleError("Cannot search");
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
    return ( 
        <form id="form1-character">
            <div id="form1-header" className="textDiv">
                <h2 id="form-characterName" className="characterName" className={props.class}>Character Name</h2>
                <h3 id="form-characterLevel" className="characterLevel">XXX CLASS</h3>
                <h3 id="form-characterRealm" className="characterRealm">REALM</h3>
            </div>
            <div id="form1-image" className="imgDiv">
            </div> 
        </form>
    );
};

// Render character overview form 1
const createOverview1 = (csrf) => {
    ReactDOM.render(
        <OverviewForm1 csrf={csrf} />, 
        document.querySelector("#characterInfoContent")
    );
   
};

// FORM 2 ***
// Return overview form 2
const OverviewForm2 = (props) => {
    return ( 
        <form id="form2-character">
            <div id="form2-header" className="textDiv">
                <h2 id="form-characterName" className="characterName" className={props.class}>Character Name</h2>
                <h3 id="form-characterRealm" className="characterRealm">REALM</h3>
            </div>
            <div id="form2-image" className="imgDiv">
            </div> 
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
        <form id="form2-character">
            <div id="form2-header" className="textDiv">
                <h2 id="form-characterName" className="characterName" className={props.class}>Character Name</h2>
                <h3 id="form-characterRealm" className="characterRealm">RANK</h3>
            </div>
            <div id="form3-image" className="imgDiv">
            </div> 
        </form>
    );
};

// Render character overview form 3
const createOverview3 = (csrf) => {
    ReactDOM.render(
        <OverviewForm3 csrf={csrf} />,
        document.querySelector("#characterInfoContent")
    );
};

// Change password modal
const PasswordChange = (props) => {
    return(
        <form id="passwordForm" 
            name="passwordForm"
            onSubmit={handlePasswordChange}
            action="/changePassword"
            method="POST"
            className="passwordForm"
            >
            <h2>Change Password</h2>
            <a class="close" href="#">&times;</a>
            <label htmlFor="username">Username: </label>   
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">New password: </label>
            <input id="pass" type="password" name="pass" placeholder="new password"/>
            <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="Submit"/>
        </form>   
    );
};

// change password handler
const handlePasswordChange = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if($("#username").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("All fields are required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()){
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);

    return false;
};

const createPasswordChange = (csrf) => {
    ReactDOM.render(
        <PasswordChange csrf={csrf} />,
        document.querySelector("#changePassContent")
    );
};

// Render components
const setup = function(csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#addCharacter")
    );

    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );

    createPasswordChange(csrf);

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
        //createOverview2(csrf);
       // return false;
       createOverview2(csrf);
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