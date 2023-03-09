export interface ITeam {
    id: string
    name: string
    img: string
    difficultyLevel: string
    teams: any
};

export interface State {
    RANDOM_TEAMS: ITeam[]
    PLAYED_TEAMS: ITeam[]
    PLAYED: boolean
    STEPS: number | null
    POINTS: number
    IS_LOADING: boolean
}

export interface Actions {
    getTeams: () => void
    getLogos: () => void
    incrementPoints: () => void
}
