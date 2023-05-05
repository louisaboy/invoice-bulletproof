import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Entity()
  export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    customerName: string;
  
    @Column()
    productName: string;
  
    @Column()
    productQty: number;
  
    @Column()
    productPrice: number;
  
    @Column()
    total: number;
  
    @CreateDateColumn()
    date: Date;

    @Column({ default: false})
    deleted: boolean;
  }
  