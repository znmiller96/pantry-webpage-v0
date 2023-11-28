export interface PantryItem {
    name: string
    quantityLevel: string
    favorite: boolean
    category: Category
    location: Location
    expirationDate?: Date | null
    measurement?: Measurement | null
}

export interface Category {
    category: string
    id: number
}

export interface Location {
    location: string
    id: number
}

export interface Measurement {
    value: string
    unit: string
}
