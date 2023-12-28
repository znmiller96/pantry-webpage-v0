export interface PantryItem {
    pantryItemId?: number
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
    categoryId: number
}

export interface Location {
    location: string
    locationId: number
}

export interface Measurement {
    value: string
    unit: string
}
