export const updateTreeNode = (
  tree: ObjectType[],
  value: string,
  fun: (node: ObjectType) => ObjectType,
  config?: { key?: string; children?: string },
) => {
  const { key = 'id', children = 'children' } = config || {}
  for (const node of tree) {
    if (node[key] === value && fun) {
      Object.assign(node, fun(node))
      return true
    }
    if (node[children]) {
      const updated = updateTreeNode(node[children], value, fun, config)
      if (updated) {
        return true
      }
    }
  }
  return false
}

export const findTreeNode = (
  tree: ObjectType[],
  predicate: (node: ObjectType) => boolean,
  config?: { children?: string },
): ObjectType | null => {
  const { children = 'children' } = config || {}
  for (const node of tree) {
    if (predicate(node)) {
      return { ...node }
    }
    if (node[children] && node[children].length) {
      const foundNode = findTreeNode(node[children], predicate)
      if (foundNode) return foundNode
    }
  }
  return null
}

export const mapTree = (
  tree: ObjectType[],
  fun?: (node: ObjectType) => ObjectType,
  level = 0,
  config?: { children?: string },
): ObjectType[] => {
  const { children = 'children' } = config || {}
  return tree.map((node: ObjectType) => {
    node.level = level
    const newNode = fun ? fun({ ...node }) : { ...node }
    if (newNode[children] && newNode[children].length) {
      newNode[children] = mapTree(newNode[children], fun, level + 1)
    }
    return newNode
  })
}

export const filterTree = (
  tree: ObjectType[],
  searchValue: string | null,
  config?: { label?: string; children?: string },
): (ObjectType | null)[] => {
  const { label = 'title', children = 'children' } = config || {}
  return tree
    .map((node: ObjectType) => {
      if (node[label].includes(searchValue || '')) return node
      if (node[children] && node[children].length) {
        const filteredChildren: any = filterTree(
          node[children],
          searchValue,
          config,
        )
        if (filteredChildren.length) {
          return {
            ...node,
            [children]: filteredChildren,
          }
        }
      }
      return null
    })
    .filter((node: any) => node !== null)
}

// 根据等级过滤树结构
export const filterLevelTree = (
  tree: ObjectType[],
  filterLevel = 3,
  config?: { children?: string },
): ObjectType[] => {
  const { children = 'children' } = config || {}
  return tree
    .filter((node) => node.level !== filterLevel)
    .map((node) => ({
      ...node,
      [children]: node[children]
        ? filterLevelTree(node[children], filterLevel, config)
        : undefined,
    }))
}
