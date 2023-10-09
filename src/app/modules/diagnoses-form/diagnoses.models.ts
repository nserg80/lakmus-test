export interface Diagnosis {
    id?: number,
    chapterNumber?: number | null,
    chapterName?: string,
    blockNumber?: string,
    blockName?: string,
    code?: string,
    name?: string,
    shortName?: string,
    isPublic?: boolean,
    comment?: string,
}
