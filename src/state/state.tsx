import create, { GetState, SetState } from 'zustand';
import { data, Translation } from '../Data';
import shuffle from '../utils/shuffle';
import { AnswerScore } from './AnswerScore';
import { ExerciseType } from './ExerciseType';
import { levenshtein } from './levenshtein';
import { States } from './States';

export type GameState = {
    // General state
    gameState: States;
    modulsActivated: boolean;
    volumeActivated: boolean;

    // Categories
    selectedCategories: string[];

    // Translations
    currentTranslation?: Translation;
    selectedTranslations: Translation[];
    wrongTranslations: Translation[];
    totalTranslations: number;
    completedTranslations: number;
    correctAnswers: number;
    wrongAnswers: number;
    answerScore?: AnswerScore;

    // Current exercise
    exerciseType?: ExerciseType;

    // State mutations
    startGame: () => void;
    checkAnswerTranslateSentence: (textarea: React.MutableRefObject<null>) => void;
    checkAnswerGuessMeaning: () => void;
    checkAnswerSpelling: (isCorrect: boolean) => void;

    toggleVolume: () => void;
    nextExercise: () => void;

    // Points
    addPositive: () => void;
    addNegative: () => void;
    addConditional: () => void;

    playPositive: () => void;
    playNegative: () => void;

    // Categories
    toggleCategory: (category: string) => void;

    // Reset
    reset: () => void;
};

export const generalState = create<GameState>((set: SetState<GameState>, get: GetState<GameState>) => ({
    // General state
    gameState: States.Jumbotron,
    modulsActivated: true,
    volumeActivated: true,

    // Categories
    selectedCategories: Array.from(new Set(data.map(d => d.category)).values()),

    // Translations
    currentTranslation: undefined,
    selectedTranslations: [],
    wrongTranslations: [],
    totalTranslations: 0,
    completedTranslations: -1,
    correctAnswers: 0,
    wrongAnswers: 0,

    // Current exercise
    exerciseType: undefined,

    // State mutations
    startGame: () => {
        const { selectedCategories } = get();

        let newQuestions = data.filter(t => selectedCategories.includes(t.category));
        shuffle(newQuestions);
        newQuestions = newQuestions.slice(0, 15);
        if (newQuestions.length === 0) {
            return;
        }

        set({
            gameState: States.RunningExercise,
            modulsActivated: false,
            selectedTranslations: newQuestions,
            totalTranslations: newQuestions.length,
            correctAnswers: 0,
            completedTranslations: -1,
        });
    },

    checkAnswerTranslateSentence: (textarea) => {
        // Check if the answer is correct
        const { currentTranslation, exerciseType } = get();

        const normalize = (input: string) => {
            let res = input.trim();
            res = res.toLowerCase();
            res = res.replace(/\s+/g, " ");
            return res;
        }

        const areEqual = (a: string, b: string) => {
            const dist = levenshtein(a, b);
            if (dist === 0) return AnswerScore.RIGHT;
            else if (dist <= 2) return AnswerScore.ALMOST;
            return AnswerScore.WRONG;
        }

        let a = normalize(((textarea.current)! as HTMLTextAreaElement).value);
        let b = normalize(currentTranslation?.english ?? " ");

        set({ answerScore: areEqual(a, b) });

        set({ gameState: States.CheckingAnswer })
    },

    checkAnswerGuessMeaning: () => {
        set({ gameState: States.CheckingAnswer })
    },

    checkAnswerSpelling: (isCorrect: boolean) => {
        const answerScore = isCorrect
            ? AnswerScore.RIGHT
            : AnswerScore.WRONG;
        set({ answerScore });
        set({ gameState: States.CheckingAnswer })
    },


    toggleVolume: (): void => {
        const { volumeActivated } = get();
        set({ volumeActivated: !volumeActivated });
    },

    nextExercise: (): void => {
        const { completedTranslations } = get();
        const { selectedTranslations } = get();
        const { totalTranslations } = get();

        if (completedTranslations === totalTranslations - 1) {
            set({ gameState: States.FinalSummary })
            return;
        }

        // New exercise
        const currentTranslation = selectedTranslations.pop();

        // Determine the exercise type
        let exerciseType = null;
        const isOneWord = !(currentTranslation?.danish ?? "").includes(" ");

        // One word
        if (isOneWord) {
            const p = Math.random()
            if (p <= .5) {
                exerciseType = ExerciseType.SpellingExercise;
            } else if (p <= .75) {
                exerciseType = ExerciseType.TranslateSentenceExercise;
            } else {
                exerciseType = ExerciseType.GuessMeaningExercise;
            }
        }
        // Sentence
        else {
            const p = Math.random()
            if (p <= .7) {
                exerciseType = ExerciseType.TranslateSentenceExercise
            } else {
                exerciseType = ExerciseType.GuessMeaningExercise;
            }
        }

        set({
            gameState: States.RunningExercise,
            completedTranslations: completedTranslations + 1,
            currentTranslation,
            exerciseType,
        })
    },

    addPositive: (): void => {
        const { correctAnswers } = get();
        const { playPositive } = get();
        const { nextExercise } = get();

        set({ correctAnswers: correctAnswers + 1 });
        playPositive();
        nextExercise();
    },

    addNegative: (): void => {
        const { wrongAnswers } = get();
        const { nextExercise } = get();
        const { playNegative } = get();
        const { wrongTranslations } = get();
        const { currentTranslation } = get();

        set({
            wrongAnswers: wrongAnswers + 1,
            wrongTranslations: [...wrongTranslations as Translation[], currentTranslation as Translation]
        });
        playNegative();
        nextExercise();
    },

    addConditional: (): void => {
        const { answerScore, addPositive, addNegative } = get();
        switch (answerScore) {
            case AnswerScore.RIGHT:
            case AnswerScore.ALMOST:
                addPositive();
                break;
            case AnswerScore.WRONG:
                addNegative();
                break;
            default:
                break;
        }
    },

    playPositive: (): void => { get().volumeActivated && new Audio("/danish/correct.wav").play() },
    playNegative: (): void => { get().volumeActivated && new Audio("/danish/wrong.wav").play() },

    toggleCategory: (category: string): void => {
        let { selectedCategories } = get();
        if (selectedCategories.includes(category)) {
            selectedCategories = selectedCategories.filter(c => c !== category);
        } else {
            selectedCategories = selectedCategories.concat(category)
        }
        set({ selectedCategories: selectedCategories })
    },

    reset: (): void => {
        set({
            gameState: States.Jumbotron,
            modulsActivated: true,
            volumeActivated: true,

            // Translations
            currentTranslation: undefined,
            selectedTranslations: [],
            wrongTranslations: [],
            totalTranslations: 0,
            completedTranslations: -1,
            correctAnswers: 0,
            wrongAnswers: 0,
        })
    }
}));