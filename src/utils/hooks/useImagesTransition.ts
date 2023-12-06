import useFilePreview from "@/utils/hooks/useFilePreview"
import useItemsTransition from "@/utils/hooks/useItemsTransition"

const IMAGE_TRANSITION_INTERVAL = 5 * 1000

/**
 * Uses `useFilePreview`.
 *
 * Gradually transits `images` one by one, creates a preview url for each.
 */
function useImagesTransition(images?: File[] | null): string | undefined {
  const image = useItemsTransition(images ?? [], { interval: IMAGE_TRANSITION_INTERVAL })
  const imageURL = useFilePreview(image)

  return imageURL
}

export default useImagesTransition
