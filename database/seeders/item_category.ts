import ItemCategory from '#models/item_catgory'
import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { nanoid } from '#utils/id_generator'

export default class ItemCategorySeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const itemCategoryRepository = em.getRepository(ItemCategory)
    const parentCat1 = itemCategoryRepository.create({ id: nanoid(), name: 'Bao bì', path: '' })
    const parentCat2 = itemCategoryRepository.create({ id: nanoid(), name: 'Trục', path: '' })
    const childCat1 = itemCategoryRepository.create({
      id: nanoid(),
      name: 'Áo bình',
      path: 'Bao bì',
      parentItemCategory: parentCat1,
    })
    const childCat2 = itemCategoryRepository.create({
      id: nanoid(),
      name: 'Nhãn mác',
      path: 'Bao bì',
      parentItemCategory: parentCat1,
    })
    const childCat3 = itemCategoryRepository.create({
      id: nanoid(),
      name: 'Lốc',
      path: 'Bao bì',
      parentItemCategory: parentCat1,
    })
    await em.persistAndFlush([parentCat1, parentCat2, childCat1, childCat2, childCat3])
  }
}
