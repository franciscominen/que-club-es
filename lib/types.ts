export interface ITeam {
    id: string
    name: string
    img: string
    difficultyLevel: number
};

export interface State {
    TEAMS: ITeam[]
    RANDOM_TEAMS: ITeam[]
    STEPS: number | null
    POINTS: number
    IS_LOADING: boolean
}

export interface Actions {
    getTeams: () => void
    getLogos: () => void
    incrementPoints: () => void
}