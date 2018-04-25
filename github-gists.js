
var GITHUB_GISTS = "https://api.github.com/users/DavidRdgz/gists";
var client = new HttpClient();

var daysSince = function(dateString) {
    var dtString = new Date(dateString);
    var diffDate = Date.now() - dtString;
    return Math.round((diffDate)/(1000*60*60*24));
}

var imageCard = function(elem, id) {
    var newDiv = document.createElement('div');
    newDiv.id = 'r'+id;
    newDiv.className = 'demo-card-image mdl-card mdl-shadow--2dp';
    newDiv.style.backgroundImage = "url('images/" + elem + "')";
    newDiv.style.display = "table-cell";
    return newDiv;
}

var defaultCard = function(elem, id) {
    var newDiv = document.createElement('div');
    newDiv.id = 'r'+id;
    newDiv.className = 'demo-card-wide mdl-card mdl-shadow--2dp';
    
    var titleDiv = document.createElement('div');
    titleDiv.className = 'mdl-card__title mdl-card--border';
    
    var fname = Object.keys(elem.files);
    var theTitle = document.createElement('a');
    theTitle.className = 'the-post-title';
    theTitle.setAttribute('href', elem.html_url);
    theTitle.innerHTML = fname;
    titleDiv.appendChild(theTitle);

    var theTitleSpace = document.createElement('div');
    theTitleSpace.className = 'mdl-layout-spacer';
    titleDiv.appendChild(theTitleSpace);

    var theTitleDate = document.createElement('div');
    theTitleDate.className = 'the-post-date';
    theTitleDate.innerHTML = daysSince(elem.created_at) + " days ago";
    titleDiv.appendChild(theTitleDate);

    newDiv.appendChild(titleDiv);

    var msgDiv = document.createElement('div');
    msgDiv.className = 'supporting-text';
    msgDiv.innerHTML = elem.description;
    newDiv.appendChild(msgDiv);

    return newDiv;
}
var files = ['aliceGraphX.png', 'ancistor.png', 'beachapi.png', 
    'chroneon.png', 'logKafka.png', 'msketch.png', 'ndf.png'];
var toAdd = document.createDocumentFragment();
files.forEach(function(elem, id) {
    toAdd.appendChild(imageCard(elem, id));
});
document.getElementById("demoImage").appendChild(toAdd);

client.get(GITHUB_GISTS, function(response) {
    var toAdd = document.createDocumentFragment();
    response.forEach(function(elem, id) {
        toAdd.appendChild(defaultCard(elem, id));
    });
    document.getElementById("demo").appendChild(toAdd);
});

