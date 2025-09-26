// Init AOS
AOS.init();

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");
const body = document.body;

function toggleTheme() {
  body.classList.toggle("dark-mode");
}

themeToggle.addEventListener("click", toggleTheme);
mobileThemeToggle.addEventListener("click", toggleTheme);

// Mobile Menu
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});


    /* ------------ Game 1: Keyboard Ninja ------------ */
    let time1 = 30, score1 = 0, countdown1, currentCmd1;
    const commands1 = [
      { text: "Press A", keys: [["a"]] },
      { text: "Press B", keys: [["b"]] },
      { text: "Press Enter", keys: [["Enter"]] }
    ];

    function newCommand1(){
      currentCmd1 = commands1[Math.floor(Math.random() * commands1.length)];
      document.getElementById("command1").textContent = currentCmd1.text;
    }

    function startGame1(){
      time1 = 30; score1 = 0;
      document.getElementById("score1").textContent = "Score: " + score1;
      newCommand1();
      countdown1 = setInterval(() => {
        time1--;
        document.getElementById("timer1").textContent = "Time left: " + time1 + "s";
        if(time1 <= 0){
          clearInterval(countdown1);
          document.getElementById("command1").textContent = "Game over! Final score: " + score1;
          currentCmd1 = null;
        }
      }, 1000);
    }

    document.addEventListener("keydown", e => {
      if(!currentCmd1) return;
      const combo = [e.key.toLowerCase()];
      currentCmd1.keys.forEach(arr => {
        const needed = arr.map(k=>k.toLowerCase());
        if(combo.join("+") === needed.join("+")){
          score1++;
          document.getElementById("score1").textContent = "Score: " + score1;
          newCommand1();
        }
      });
    });

    document.getElementById("startBtn1").addEventListener("click", startGame1);

    /* ------------ Game 2: Shortcut Master ------------ */
    const commands2 = [
      {text: "Copy text", keys: [["Control","c"],["Meta","c"]]},
      {text: "Paste text", keys: [["Control","v"],["Meta","v"]]},
      {text: "Undo action", keys: [["Control","z"],["Meta","z"]]},
      {text: "Find a word", keys: [["Control","f"],["Meta","f"]]},
      {text: "Refresh page", keys: [["Control","r"],["Meta","r"],["F5"]]}
    ];

    let score2 = 0, time2 = 30, currentCmd2, countdown2;

    function newCommand2() {
      currentCmd2 = commands2[Math.floor(Math.random()*commands2.length)];
      document.getElementById("command2").textContent = "Shortcut for: " + currentCmd2.text;
    }

    function startGame2() {
      score2 = 0; time2 = 30;
      document.getElementById("score2").textContent = "Score: 0";
      newCommand2();
      countdown2 = setInterval(() => {
        time2--;
        document.getElementById("timer2").textContent = "Time left: " + time2 + "s";
        if(time2 <= 0){
          clearInterval(countdown2);
          document.getElementById("command2").textContent = "Game over! Final score: " + score2;
          currentCmd2 = null;
        }
      }, 1000);
    }

    document.addEventListener("keydown", e => {
      if(!currentCmd2) return;
      const pressed = [e.key==="Meta"?"Meta":e.key, e.ctrlKey?"Control":null].filter(Boolean);
      const combo = pressed.map(k=>k.toLowerCase()).sort().join("+");
      currentCmd2.keys.forEach(arr => {
        const needed = arr.map(k=>k.toLowerCase()).sort().join("+");
        if(combo === needed){
          score2++;
          document.getElementById("score2").textContent = "Score: " + score2;
          newCommand2();
        }
      });
    });

    document.getElementById("startBtn2").addEventListener("click", startGame2);

    /* ------------ Game 3: Digital Detective ------------ */
    const questions = [
      {
        q: "Which password is strongest?",
        options: ["12345678", "P@ssw0rd2025!", "birthday", "qwerty"],
        answer: 1
      },
      {
        q: "You receive an email asking for your password. What should you do?",
        options: ["Reply with password", "Ignore/Delete it", "Click the link", "Forward to all friends"],
        answer: 1
      },
      {
        q: "This URL looks like: http://bank-secure-login.com. Is it safe?",
        options: ["Yes, it says bank", "No, suspicious domain", "Sure, looks fine", "Click and check later"],
        answer: 1
      }
    ];

    let currentQ = 0, score3 = 0;

    function loadQuestion() {
      const q = questions[currentQ];
      document.getElementById("question").textContent = q.q;
      const choiceBox = document.getElementById("choices");
      choiceBox.innerHTML = "";
      q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(i);
        choiceBox.appendChild(btn);
      });
      document.getElementById("nextBtn").style.display = "none";
    }

    function checkAnswer(i) {
      if(i === questions[currentQ].answer) { 
        score3 += 10; 
        alert("Correct!"); 
      }
      else alert("Oops! Correct answer: " + questions[currentQ].options[questions[currentQ].answer]);
      document.getElementById("score3").textContent = "Score: " + score3;
      document.getElementById("nextBtn").style.display = "inline-block";
    }

    document.getElementById("nextBtn").onclick = () => {
      currentQ++;
      if(currentQ < questions.length) loadQuestion();
      else {
        document.getElementById("game-box3").innerHTML =
          `<h2>Game Over!</h2><p>Your final score: ${score3}</p>
           <p>🎉 You are a ${score3 >= 20 ? "Digital Pro!" : "Digital Rookie. Keep Learning!"}</p>`;
      }
    };

    loadQuestion();
  