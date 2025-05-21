import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("carts", { schema: "e_commerce" })
export class Carts {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "product_id", nullable: true })
  productId: number | null;

  @Column("int", { name: "quantity", nullable: true })
  quantity: number | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("bigint", { name: "created_by" })
  createdBy: string;

  @Column("timestamp", { name: "updated_on", nullable: true })
  updatedOn: Date | null;

  @Column("bigint", { name: "updated_by", nullable: true })
  updatedBy: string | null;

  @DeleteDateColumn({ name: "deleted_on" })
  deletedOn: Date | null;
}
