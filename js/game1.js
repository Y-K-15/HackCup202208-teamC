'use strict';

console.clear();

{
  // 誕生日
  const birthdays = [
    {
      name: 'ルフィ',
      month: 4,
      date: '05',
      picture: '../img/onepiece01_luffy2.png',
    },
    {
      name: 'ゾロ',
      month: 10,
      date: '11',
      picture: '../img/onepiece02_zoro_bandana.png',
    },
    {
      name: 'ナミ',
      month: 6,
      date: '03',
      picture: '../img/onepiece03_nami.png',
    },
    {
      name: 'ウソップ',
      month: 3,
      date: '01',
      picture: '../img/onepiece04_usopp_sogeking.png',
    },
    {
      name: 'サンジ',
      month: 2,
      date: '02',
      picture: '../img/onepiece05_sanji.png',
    },
    {
      name: 'チョッパー',
      month: 11,
      date: '24',
      picture: '../img/onepiece06_chopper.png',
    },
    {
      name: 'ロビン',
      month: 1,
      date: '06',
      picture: '../img/onepiece07_robin.png',
    },
    {
      name: 'フランキー',
      month: 2,
      date: '09',
      picture: '../img/onepiece08_franky.png',
    },
    {
      name: 'ブルック',
      month: 3,
      date: '03',
      picture: '../img/onepiece09_brook.png',
    },
    {
      name: 'ジンベエ',
      month: 3,
      date: '02',
      picture: '../img/onepiece10_jinbe.png',
    },
    {
      name: 'ドフラミンゴ',
      month: 9,
      date: '23',
      picture: '../img/onepiece17_doflamingo.png',
    },
    {
      name: 'Akira',
      month: 0,
      date: '05',
      picture: '../img/Akira.jpg',
    },
    {
      name: 'J',
      month: 9,
      date: '03',
      picture: '../img/J.jpg',
    },
    {
      name: 'Lisa',
      month: 6,
      date: '20',
      picture: '../img/Lisa.jpg',
    },
    {
      name: 'Mayuko',
      month: 10,
      date: '08',
      picture: '../img/Mayuko.jpg',
    },
    {
      name: 'Ryo',
      month: 5,
      date: '15',
      picture: '../img/Ryo_Koshiro.jpg',
    },
    {
      name: 'Koshiro',
      month: 6,
      date: '24',
      picture: '../img/Ryo_Koshiro.jpg',
    },
    {
      name: 'Ukyo',
      month: 10,
      date: '21',
      picture: '../img/Ukyo.jpg',
    },
  ];

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      // 30
      // 29, 30
      // 28, 29, 30
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
        isBirthday: false,
      });
    }

    return dates;
  }

  function getCalendarBody() {
    const dates = [];  // date: 日付, day: 曜日
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
        isBirthday: false,
      });
    }

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    // isBirthday付与
    for (let j = 0; j < birthdays.length; j++) {
      for (let k = 1; k <= lastDate; k++) {
        if (month === birthdays[j].month && k === Number(birthdays[j].date)) {
          dates[k-1].isBirthday = true;
        }
      };
    };

    return dates;
  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
        isBirthday: false,
      });
    }

    return dates;
  }

  function clearCalendar() {
    const tbody = document.querySelector('tbody');
  
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),  // ... スプレッド構文
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');
        
        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        if (date.isBirthday) {
          td.classList.add('birthday');
          // td.setAttribute("id", `birthday_${month}_${date.date}`);
          td.setAttribute("data-quiz", `${String(month).padStart(2, 0)}${String(date.date).padStart(2, 0)}`);
        }

        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
    renderQuiz();
  }

  function renderQuiz() {
    clearQuiz();
    const question = document.querySelector('.question');
    // const choices = document.querySelectorAll('.choices ul');
    const answer = document.querySelector('.answer');
    const picture = document.querySelector('.picture');

    const selectedBirthdays = document.querySelectorAll('.birthday');

    selectedBirthdays.forEach(selectedBirthday => {
      selectedBirthday.addEventListener('click', () => {

        const quiz = document.querySelector('.quiz');

        quiz.classList.remove('hide');
        nextQuiz();

        // clearCalendar();
        // renderWeeks();

        quiz.classList.remove('hide');
        
        for (let i = 0; i < birthdays.length; i++) {
          if (month === birthdays[i].month && selectedBirthday.dataset.quiz.substr(2, 2) === birthdays[i].date) {
            selectedBirthday.classList.add('selected');

            question.textContent = (birthdays[i].month)+1 + '月' + birthdays[i].date + '日が誕生日なのは誰？';

            let r_correct = Math.floor(Math.random() * 3);
            let correctBtn = document.getElementById('choice_'+ r_correct);
            correctBtn.textContent = birthdays[i].name;
            correctBtn.setAttribute("data-answer", "correct");

            let r_incorrect_list = [];
            r_incorrect_list.push(i);

            for (let j = 0; j < 3; j++) {
              if (j !== r_correct) {
                let r_incorrect = Math.floor(Math.random() * birthdays.length);

                for (let k = 0; k >= 0; k++) {
                  if (r_incorrect_list.includes(r_incorrect)) {
                    r_incorrect = Math.floor(Math.random() * birthdays.length);
                  } else {
                    r_incorrect_list.push(r_incorrect);
                    break;
                  }
                }

                let incorrectBtn = document.getElementById('choice_' + j);
                incorrectBtn.textContent = birthdays[r_incorrect].name;
                incorrectBtn.setAttribute("data-answer", "incorrect");
              }
            };

            answer.innerHTML = '<p>' + (birthdays[i].month + 1) + '月' + birthdays[i].date + '日は<br>' + birthdays[i].name + 'の誕生日です。</p>';
            picture.innerHTML = '<img src="' + birthdays[i].picture + '" alt="" class="picture_img">'
          }
        };
      });
      checkAnswer();
    });
  }

  function nextQuiz() {
    const selectedBirthdays = document.querySelectorAll('.birthday');
    // selectedBirthdays.forEach('click', () => {
    //   // setDisabled(selectedBirthdays);
    //   // setDisabled(selectedBirthday);
    //   // renderQuiz();
    //   console.log('aaa');
    //   // createCalendar();
    // });
    selectedBirthdays.forEach(selectedBirthday => {
      selectedBirthday.addEventListener('click', () => {
        setDisabled(selectedBirthdays);

        if (selectedBirthdays )

        console.log('afdf');
      });
    });
  }

  function clearQuiz() {
    const quiz = document.querySelector('.quiz');
  
    while (quiz.firstChild) {
      quiz.removeChild(quiz.firstChild);
    }

    quiz.classList.add('hide');

    quiz.innerHTML = '<div class="question"></div><div class="choices"><ul><li><button id="choice_0" class="choice choice_0"></button></li><li><button id="choice_1" class="choice choice_1"></button></li><li><button id="choice_2" class="choice choice_2"></button></li></ul></div><div class="answer"></div><picture class="picture"></picture>'
  }

  function checkAnswer() {
    const answer = document.querySelector('.answer');

    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => {
      choice.addEventListener('click', () => {

        const selectedBirthdays = document.querySelectorAll('.birthday');

        if (choice.getAttribute('data-answer') === 'correct') {
          choice.classList.add('correct');
          answer.classList.add('correct');
          // sound("square", 0.3);
        } else {
          choice.classList.add('incorrect');
          answer.classList.add('incorrect');
        }
        setDisabled(choices);

        const picture_img = document.querySelector('.picture_img');

        picture_img.classList.add('answered');

        choices.forEach(choice => {
          choice.classList.add('disabled');
        });
      });
    });
  }

  const setDisabled = ables => {
    ables.forEach(able => {
      able.disabled = true;
    })
  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  function sound(type, sec) {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(sec);
  }

  document.getElementById('before_prev').addEventListener('click', () => {
    month = month - 2;
    if (month === -1) {
      year--;
      month = 11;
    } else if (month === -2) {
      year--;
      month = 10;
    }

    createCalendar();
  });

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }

    createCalendar();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }

    createCalendar();
  });

  document.getElementById('after_next').addEventListener('click', () => {
    month = month + 2;
    if (month === 12) {
      year++;
      month = 0;
    } else if (month === 13) {
      year++;
      month = 1;
    }

    createCalendar();
  });

  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalendar();
  });

  document.getElementById('next_quiz').addEventListener('click', () => {
    createCalendar();
  });

  createCalendar();
}