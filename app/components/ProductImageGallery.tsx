'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { MicroCMSImage } from 'microcms-js-sdk'

type ProductImageGalleryProps = {
  images: MicroCMSImage[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div className='relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100'>
        <div className='w-full h-full flex items-center justify-center'>
          <svg className='w-32 h-32 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
          </svg>
        </div>
      </div>
    )
  }

  const selectedImage = images[selectedImageIndex]

  return (
    <div className='space-y-4'>
      {/* メイン画像 */}
      <div className='relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 group'>
        <Image
          src={selectedImage.url}
          alt={`Product image ${selectedImageIndex + 1} of ${productName}`}
          width={selectedImage.width}
          height={selectedImage.height}
          className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
          priority={selectedImageIndex === 0}
        />
      </div>

      {/* サムネイル画像（複数ある場合） */}
      {images.length > 1 && (
        <div className='grid grid-cols-4 gap-4'>
          {images.slice(0, 4).map((image, index) => (
            <button
              key={image.url}
              type='button'
              onClick={() => setSelectedImageIndex(index)}
              className={`relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity border-2 ${
                selectedImageIndex === index
                  ? 'border-blue-500 opacity-100'
                  : 'border-transparent'
              }`}
            >
              <Image
                src={image.url}
                alt={`Product thumbnail ${index + 1} of ${productName}`}
                width={image.width}
                height={image.height}
                className='object-cover w-full h-full'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
