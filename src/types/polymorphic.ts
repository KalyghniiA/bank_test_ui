import type { ComponentPropsWithoutRef, ElementType } from 'react'

/**
 * Пропсы компонента, который можно отрисовать другим элементом через `as`:
 * <AccountCard as={Link} to="/accounts/1" … /> — собственные пропсы + пропсы выбранного элемента.
 */
export type PolymorphicProps<C extends ElementType, Own> = Own & {
  as?: C
} & Omit<ComponentPropsWithoutRef<C>, keyof Own | 'as'>
