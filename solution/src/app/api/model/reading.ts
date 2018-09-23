export interface Reading {

    /**
     * Unique identifier of the reading
     */

    id: string;

    /**
     * ISO 8601 formatted date time *WITHOUT* time zone
     */

    timestamp: Date;

    /**
     * value 1 of the reading
     */

    value1: number;

    /**
     * value 2 of the reading
     */

    value2: number;

}


