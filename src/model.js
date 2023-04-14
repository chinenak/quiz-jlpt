import { firebaseConfig, LINKTO } from './config.js';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import QuizView from './view/quizView.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//////////////////////////////////

export const state = {
  level: 'N5',
  method: 'random',
  curQuiz: 0,
  interval: 'setInt',
  random: {
    data: [],
    curQuiz: Math.trunc(Math.random() * 157),
  },
  vocabulary: {
    data: [],
    score: 0,
  },
  vocabugrammar: {
    data: [],
    score: 0,
  },
  grammar: {
    data: [],
    score: 0,
  },
  listening: {
    data: [],
    score: 0,
  },
};

// Add document in Cloud Firebase
const tempObj = (obj, docRef, _level) => {
  return {
    answerCorrect: obj.answerCorrect,
    author: 'admin',
    choiceAnswers: obj.choiceQuestion,
    createAt: serverTimestamp(),
    docOrder: obj.id,
    level: _level,
    name: docRef.id,
    problemName: obj.problemName,
    problemOrder: obj.problemOrder,
    public: false,
    questionContent: obj.questionContent,
    questionName: obj.questionName,
    questionOrder: obj.question,
    score: obj.score,
    section: obj.categories,
  };
};

const addDocument = async function (level, _level) {
  try {
    level.forEach(async obj => {
      const docRef = doc(collection(db, `quiz/2018_12/${_level}`));
      await setDoc(docRef, tempObj(obj, docRef, _level));
      console.log('Document written with Id: ', docRef.id);
    });
  } catch (e) {
    console.log('Error adding document: ', e);
  }
};
// addDocument(N1,'N1');

// Update documents in Cloud Firebase
const updateDocument = async function (level, section) {
  const ref = `quiz/2018_12/${level}`;
  const q = query(
    collection(db, `quiz/2018_12/${level}`),
    where('section', '==', `${section}`)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(docQuery => {
    const docRef = doc(db, `${ref}/${docQuery.id}`);
    setDoc(docRef, { section: '文字語彙' }, { merge: true });
  });
};
// updateDocument('N5', '文字・語彙');

///////////////////////////////////////////////////////
const q = (level, section) =>
  query(
    collection(db, `quiz/2018_12/${level}`),
    where('section', 'in', LINKTO[section]),
    orderBy('docOrder')
  );

// Get level and section data from Cloud Firebase
export const getData = async function (level, section) {
  try {
    const query = q(level, section);
    const querySnapshot = await getDocs(query);
    const tempArr = [];
    querySnapshot.forEach(doc => {
      tempArr.push(doc.data());
    });

    // Map data from Cloud Firebase to new instance of quiz
    state[section].data = tempArr.map(
      question =>
        new QuizView(
          question.docOrder,
          question.level,
          question.section,
          question.problemName,
          question.questionOrder,
          question.questionContent,
          question.questionName,
          question.choiceAnswers,
          question.answerCorrect,
          question.score
        )
    );
  } catch (error) {
    console.error(error.message);
  }
};

// Get all of level data
export const getAllData = async function () {
  const qN1 = q('N1', 'random');
  const qN2 = q('N2', 'random');
  const qN3 = q('N3', 'random');
  const qN4 = q('N4', 'random');
  const qN5 = q('N5', 'random');

  const querySnapshot = await Promise.all([
    getDocs(qN1),
    getDocs(qN2),
    getDocs(qN3),
    getDocs(qN4),
    getDocs(qN5),
  ]);
  const tempArr = [];
  querySnapshot.forEach(arr => {
    arr.forEach(doc => {
      tempArr.push(doc.data());
    });
  });

  state.random.data = tempArr.map(
    question =>
      new QuizView(
        question.docOrder,
        question.level,
        question.section,
        question.problemName,
        question.questionOrder,
        question.questionContent,
        question.questionName,
        question.choiceAnswers,
        question.answerCorrect,
        question.score
      )
  );
};
