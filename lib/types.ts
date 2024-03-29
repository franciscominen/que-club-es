export interface ITeam {
    id: string
    name: string
    img: string
    difficultyLevel: string
    teams: any
};

export interface State {
    ALL_TEAMS: ITeam[]
    RANDOM_TEAMS: ITeam[]
    PLAYED_TEAMS: ITeam[]
    PLAYED: boolean
    STEPS: number
    ARCADE_STEPS: number
    POINTS: number
    IS_LOADING: boolean
    SCOREBOARD: string[]
    APP_SOUND_MUTED: boolean
    SHOW_SOUND_MODAL: boolean
}

export interface Actions {
    getTeams: () => void
    getLogos: () => void
    incrementPoints: () => void
}
