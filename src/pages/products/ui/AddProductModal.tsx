import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Group, Modal, NumberInput, TextInput } from '@mantine/core'
import { memo, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { addProductSchema, type AddProductValues } from '@/entities/product'

import styles from './AddProductModal.module.scss'

interface AddProductModalProps {
  isOpen: boolean
  isSubmitting: boolean
  onClose: () => void
  onSubmit: (values: AddProductValues) => Promise<unknown>
}

const defaultValues: AddProductValues = {
  title: '',
  price: 0,
  vendor: '',
  sku: '',
}

export const AddProductModal = memo(function AddProductModal({ isOpen, isSubmitting, onClose, onSubmit }: AddProductModalProps) {
  const form = useForm<AddProductValues>({
    defaultValues,
    resolver: zodResolver(addProductSchema),
  })

  useEffect(() => {
    if (!isOpen) {
      form.reset(defaultValues)
    }
  }, [form, isOpen])

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values)
    form.reset(defaultValues)
  })

  return (
    <Modal classNames={{ content: styles.modalContent, title: styles.modalTitle }} opened={isOpen} onClose={onClose} title="Добавить товар">
      <form className={styles.modalForm} onSubmit={(event) => void handleSubmit(event)}>
        <TextInput
          label="Наименование"
          placeholder="Например, Смартфон Apple iPhone"
          {...form.register('title')}
          error={form.formState.errors.title?.message}
        />

        <Controller
          control={form.control}
          name="price"
          render={({ field }) => (
            <NumberInput
              decimalScale={2}
              hideControls
              label="Цена"
              placeholder="0"
              error={form.formState.errors.price?.message}
              value={field.value}
              onChange={(value) => field.onChange(typeof value === 'number' ? value : 0)}
            />
          )}
        />

        <TextInput
          label="Вендор"
          placeholder="Например, Apple"
          {...form.register('vendor')}
          error={form.formState.errors.vendor?.message}
        />

        <TextInput
          label="Артикул"
          placeholder="Например, GUYDSDFS-FF"
          {...form.register('sku')}
          error={form.formState.errors.sku?.message}
        />

        <Group className={styles.modalActions} justify="space-between">
          <Button className={styles.modalCancelButton} onClick={onClose} type="button" variant="default">
            Отмена
          </Button>

          <Button className={styles.modalSubmitButton} loading={isSubmitting} type="submit">
            Сохранить
          </Button>
        </Group>
      </form>
    </Modal>
  )
})
