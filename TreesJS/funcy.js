var decisions;
var answers;
var currentDecisionNo = 1;
var currentDecisions = [];
var decisionButtons;

function main() {	
	decisionButtons = document.getElementsByClassName('decisionButton');
	
    getJSON();
}



function getJSON() {
	
	decisionButtons[0].disabled = false;
    decisionButtons[1].disabled = false;
	
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status === 200) {
            var responseObject = JSON.parse(xhr.responseText);
            decisions = responseObject.decisions;
            answers = responseObject.answers;

            setButtonEvents();
            initNextDecision();
        }
    }

    xhr.open('GET', 'JSON/treesData.json', true);
    xhr.send(null);
}

function setButtonEvents() {
	
    decisionButtons[0].addEventListener('click', function() {
        getNextDecisionNo(0);
    }, false);
    decisionButtons[1].addEventListener('click', function() {
        getNextDecisionNo(1);
    }, false);
	
	document.getElementById('resetButton').addEventListener('click',
		resetList,
	false);
}

function removeButtonEvents() {
	
	decisionButtons[0].disabled = true;
    decisionButtons[1].disabled = true;
	console.log('removed');
}

function printPrevDecision(i) {
	var currentText = '';	
    
    if (!(currentDecisionNo === 'NULL')) {
        currentText = '<li>' + currentDecisions[i].decisionText + '</li>';
    } 
	document.getElementById('output').innerHTML += currentText;
}

function getNextDecisionNo(i) {
	printPrevDecision(i);
	
    currentDecisionNo = currentDecisions[i].nextDecisionNo;
    if (currentDecisionNo === 'NULL') {
        getAnswer(currentDecisions[i].answerUid)
    } else initNextDecision()
}

function initNextDecision() {
    //// I cleared out currentDecisions here, since it was actually continuing to store every entry pair
    currentDecisions = [];
    for (i = 0; i < decisions.length; i++) {
        if (decisions[i].decisionNo == currentDecisionNo) {
            currentDecisions.push(decisions[i]);
        }
    }

    printCurrentDecisions();
}

function printCurrentDecisions() {
    for (var i = 0; i < 2; i++) {
        document.getElementById("decisionButton" + (i + 1)).innerHTML = currentDecisions[i].decisionText;
    }
}

function getAnswer(answerId) {
    //// We weren't actually finding the matching Uid in the data,
    //// we were just checking against the index:P
    var answer;
    for (i = 0; i < answers.length; i++) {
        if (answers[i].answerUid == answerId) {
            answer = answers[i];
        }
    }
    console.log(answer);
    printAnswer(answer);
	
	removeButtonEvents();
}

function printAnswer(answer) {
   	document.getElementById('answer').innerHTML = '<b>The tree is a ' + answer.answerText + '</b>!';
}

function resetList() {
	
	output.innerHTML = '';
	answer.innerHTML = '';
    currentDecisionNo = 1;
	initNextDecision();
	
	decisionButtons[0].disabled = false;
    decisionButtons[1].disabled = false;
}

main();