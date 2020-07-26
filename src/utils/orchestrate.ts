
export const orchestrate = (data: any[], count: number): Array<any[]> => {
  if (data.length <=count) {
    return data.map(
      d => [d]
    )
  } else {
    const sliceRange = Math.floor(data.length / count)
    const slices = []
    for (let i = 0; i < count; i++) {
      const startIndex = i * sliceRange
      let endIndex = startIndex + sliceRange
      if (i === count-1) {
        endIndex = data.length
      }
      slices.push(data.slice(startIndex, endIndex))
    }
    return slices
  }
}
