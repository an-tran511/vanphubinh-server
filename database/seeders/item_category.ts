import ItemCategory from '#models/item_catgory'
import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { nanoid } from '#utils/id_generator'

export default class ItemCategorySeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const itemCategoryRepository = em.getRepository(ItemCategory)
    await itemCategoryRepository.insertMany([
      { id: nanoid(), name: 'Bao bì', path: '', createdAt: new Date(), updatedAt: new Date() },
      { id: nanoid(), name: 'Trục', path: '', createdAt: new Date(), updatedAt: new Date() },
      {
        id: nanoid(),
        name: 'Áo bình',
        path: 'Bao bì',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: nanoid(),
        name: 'Nhãn mác',
        path: 'Bao bì',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: nanoid(), name: 'Lốc', path: 'Bao bì', createdAt: new Date(), updatedAt: new Date() },
    ])
  }
}
