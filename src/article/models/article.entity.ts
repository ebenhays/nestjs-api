import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Articles {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: 'varchar', length: 50 })
    title: string
    @Column()
    author: string
    @Column({ type: 'varchar', length: 100 })
    text?: string
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    publicationDate: Date
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    expirationDate: Date
}



