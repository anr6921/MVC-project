"use strict";
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Add character handler
var handleDomo = function handleDomo(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#domoName").val() == '' || $("#domoAge").val() == '') {
        handleError("RAWR! All feilds are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
        loadDomosFromServer();
    });

    return false;
};

// Return character search form
var DomoForm = function DomoForm(props) {
    return React.createElement(
        "form",
        { id: "domoForm", name: "domoForm", action: "/maker", method: "POST", className: "domoForm", type: "submit" },
        React.createElement(
            "div",
            { id: "searchCharacterName" },
            React.createElement(
                "label",
                { "for": "name" },
                "Name: "
            ),
            React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Character" })
        ),
        React.createElement(
            "div",
            { id: "searchCharacterRealm" },
            React.createElement(
                "label",
                { "for": "age" },
                "Realm: "
            ),
            React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Realm" })
        ),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Add Character" })
    );
};

// Return character list 
var DomoList = function DomoList(props) {
    if (props.domos.length === 0) {
        return React.createElement(
            "div",
            { className: "domoList" },
            React.createElement(
                "h3",
                { className: "emptyDomo" },
                "No Domos yeet"
            )
        );
    };

    var domoNodes = props.domos.map(function (domo) {
        return React.createElement(
            "li",
            { className: "character", key: domo._id },
            React.createElement(
                "div",
                { className: "imgDiv" },
                React.createElement("img", { src: "http://render-us.worldofwarcraft.com/character/" + domo.icon, alt: "domo face", className: "domoFace" })
            ),
            React.createElement(
                "div",
                { className: "textDiv" },
                React.createElement(
                    "h3",
                    _defineProperty({ className: "characterName" }, "className", domo.class),
                    domo.name,
                    React.createElement("input", { onClick: function onClick() {
                            return setupCharacter(domo.name, domo.age);
                        }, type: "radio", name: "radio", id: domo.name, value: domo.age })
                ),
                React.createElement(
                    "h3",
                    { className: "characterLevel" },
                    domo.age
                )
            )
        );
    });

    return React.createElement(
        "div",
        { className: "domoList" },
        React.createElement(
            "ul",
            null,
            domoNodes
        )
    );
};

// load characters from server2
var loadDomosFromServer = function loadDomosFromServer() {
    sendAjax('GET', '/getDomos', null, function (data) {
        ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
    });
};

// handle search for character content
var handleSearch = function handleSearch(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#pass").val() == '') {
        handleError("RAWR!! cannot search");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    //sendAjax('POST', $("#characterInfoContent").attr("action"), $("#characterInfoContent").serialize(), redirect);


    redirect({ redirect: '/maker' });
    return false;
};
// FORM 1 ***
// Return overview form 1
var OverviewForm1 = function OverviewForm1(props) {
    console.log('in overview form1');
    console.dir(props);
    return (
        /*
        <form id="domoForm" name="domoForm" action="/searchCharacter" method="POST" className="domoForm">
            
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Add Character" />
        </form>*/
        React.createElement(
            "form",
            { id: "form1-character" },
            React.createElement(
                "div",
                { id: "form1-header", className: "textDiv" },
                React.createElement(
                    "h2",
                    _defineProperty({ id: "form1-characterName", className: "characterName" }, "className", props.class),
                    "Character Name"
                ),
                React.createElement(
                    "h3",
                    { id: "form1-characterLevel", className: "characterLevel" },
                    "XXX CLASS"
                ),
                React.createElement(
                    "h3",
                    { id: "form1-characterRealm", className: "characterRealm" },
                    "REALM"
                )
            ),
            React.createElement("div", { id: "form1-image", className: "imgDiv" })
        )
    );
};

// render character overview form 1
var createOverview1 = function createOverview1(csrf) {
    //sendAjax('POST', '/searchCharacter', null, (data) => {
    ReactDOM.render(React.createElement(OverviewForm1, { csrf: csrf }), document.querySelector("#characterInfoContent"));
    //});
};

// FORM 2 ***
// Return overview form 2
var OverviewForm2 = function OverviewForm2(props) {
    return React.createElement(
        "form",
        { id: "domoForm", name: "domoForm", action: "/searchCharacter", method: "POST", className: "domoForm" },
        React.createElement(
            "div",
            { id: "searchCharacterName" },
            React.createElement(
                "label",
                { "for": "name" },
                "Name: "
            ),
            React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Character" })
        ),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Add Character" })
    );
};

// render character overview form 2
var createOverview2 = function createOverview2(csrf) {
    ReactDOM.render(React.createElement(OverviewForm2, { csrf: csrf }), document.querySelector("#characterInfoContent"));
};

// FORM 3 ***
// Return overview form 3
var OverviewForm3 = function OverviewForm3(props) {
    return React.createElement(
        "form",
        { id: "domoForm", name: "domoForm", action: "/searchCharacter", method: "POST", className: "domoForm" },
        React.createElement(
            "div",
            { id: "searchCharacterName" },
            React.createElement(
                "label",
                { "for": "name" },
                "Name: "
            ),
            React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Character" })
        ),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Add Character" })
    );
};

// render character overview form 3
var createOverview3 = function createOverview3(csrf) {
    ReactDOM.render(React.createElement(OverviewForm3, { csrf: csrf }), document.querySelector("#characterInfoContent"));
};

// Change password modal
var SignupWindow = function SignupWindow(props) {
    React.createElement(
        "h1",
        { id: "title" },
        "Quester"
    );
    return React.createElement(
        "div",
        { id: "landingContainer" },
        React.createElement(
            "h3",
            null,
            "Change Password"
        ),
        React.createElement(
            "a",
            { "class": "close", href: "#" },
            "\xD7"
        ),
        React.createElement(
            "div",
            { id: "loginContainer" },
            React.createElement(
                "form",
                { id: "signupForm",
                    name: "signupForm",
                    onSubmit: handleSignup,
                    action: "/signup",
                    method: "POST",
                    className: "mainForm"
                },
                React.createElement(
                    "label",
                    { htmlFor: "pass" },
                    "New password: "
                ),
                React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
                React.createElement(
                    "label",
                    { htmlFor: "pass2" },
                    "Retype new password: "
                ),
                React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
                React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign up" })
            )
        )
    );
};

// change password handler
var handleSignup = function handleSignup(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

var createSignupWindow = function createSignupWindow(csrf) {
    ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#changePassContent"));
};

// Render components: add character form, character list, overview, raid progression, pvp
var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#addCharacter"));

    ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));

    createSignupWindow(csrf);

    var overviewBtn1 = document.querySelector("#overviewBtn1");
    var overviewBtn2 = document.querySelector("#overviewBtn2");
    var overviewBtn3 = document.querySelector("#overviewBtn3");

    overviewBtn1.addEventListener("click", function (e) {
        e.preventDefault();
        createOverview1(csrf);
        return false;
    });

    overviewBtn2.addEventListener("click", function (e) {
        //e.preventDefault();
        createOverview2(csrf);
        // return false;
    });

    overviewBtn3.addEventListener("click", function (e) {
        //e.preventDefault();
        createOverview3(csrf);
        //return false;
    });

    loadDomosFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
