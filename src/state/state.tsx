import create, { GetState, SetState } from 'zustand';
import { data, Translation } from '../Data';
import { ExerciseType } from './ExerciseType';
import { States } from './States';

export type GameState = {
    // General state
    gameState: States;
    modulsActivated: boolean;
    volumeActivated: boolean;

    // Translations
    currentTranslation?: Translation;
    selectedTranslations: Translation[];
    wrongTranslations: Translation[];
    totalTranslations: number;
    completedTranslations: number;
    correctAnswers: number;
    wrongAnswers: number;

    // Current exercise
    exerciseType?: ExerciseType;

    // State mutations
    startGame: () => void;
    checkAnswer: () => void;
    toggleVolume: () => void;
    nextExercise: () => void;

    // Points
    addPositive: () => void;
    addNegative: () => void;

    playPositive: () => void;
    playNegative: () => void;

    // Reset
    reset: () => void;
};

export const generalState = create<GameState>((set: SetState<GameState>, get: GetState<GameState>) => ({
    // General state
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

    // Current exercise
    exerciseType: undefined,

    // State mutations
    startGame: () => {
        set({
            gameState: States.RunningExercise,
            modulsActivated: false,
            selectedTranslations: data.slice(0, 5),
            totalTranslations: 5,
            correctAnswers: 0,
            completedTranslations: -1,
        });
    },

    checkAnswer: () => {
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
            set({
                gameState: States.FinalSummary
            })
            return;
        }

        set({
            exerciseType: Math.random() < 0.5 ? ExerciseType.GuessMeaningExercise : ExerciseType.TranslateSentenceExercise,
            completedTranslations: completedTranslations + 1,
            currentTranslation: selectedTranslations.pop(),
            gameState: States.RunningExercise
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

    playPositive: (): void => { get().volumeActivated && new Audio("correct.wav").play() },
    playNegative: (): void => { get().volumeActivated && new Audio("wrong.wav").play() },

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