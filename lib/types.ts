export interface ITeam {
    id: string
    name: string
    img: string
    difficultyLevel: string
    teams: any
};

export interface State {
    TEAMS: ITeam[]
    RANDOM_TEAMS: ITeam[]
    PLAYED_TEAMS: ITeam[]
    STEPS: number | null
    POINTS: number
    IS_LOADING: boolean
    PLAYED: boolean
}

export interface Actions {
    getTeams: () => void
    getLogos: () => void
    incrementPoints: () => void
}