'use client'

import { useCallback, useLayoutEffect } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionMode,
  Connection,
  ConnectionLineType,
} from 'reactflow'
import dagre from 'dagre'
import 'reactflow/dist/style.css'
import CustomFamilyNode from './CustomFamilyNode'

const nodeTypes = {
  familyNode: CustomFamilyNode,
}

// Initialize the dagre graph
const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

// Set the direction and spacing for the tree
const nodeWidth = 250
const nodeHeight = 100
const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  // Create a new dagre graph
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  // Set the graph options
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction, nodesep: 50, ranksep: 70 })

  // Add nodes to the graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  // Add edges to the graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  // Apply the layout
  dagre.layout(dagreGraph)

  // Get the positioned nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }
  })

  return { nodes: layoutedNodes, edges }
}

// Define the initial nodes without positions
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'familyNode',
    position: { x: 0, y: 0 }, // Position will be calculated by dagre
    data: {
      name: 'Sher Afzal',
      status: 'Deceased',
    },
  },
  {
    id: '2',
    type: 'familyNode',
    position: { x: 0, y: 0 },
    data: {
      name: 'Muhammad Afzal',
      status: 'Deceased',
    },
  },
  {
    id: '3',
    type: 'familyNode',
    position: { x: 0, y: 0 },
    data: {
      name: 'Shahid Hussain',
      code: 'CN',
      status: 'Living',
    },
  },
  {
    id: '4',
    type: 'familyNode',
    position: { x: 0, y: 0 },
    data: {
      name: 'Afzal Hussain',
      code: 'CN',
      status: 'Living',
    },
  },
  {
    id: '5',
    type: 'familyNode',
    position: { x: 0, y: 0 },
    data: {
      name: 'Tariq Hussain',
      code: 'CN',
      status: 'Living',
    },
  },
  {
    id: '6',
    type: 'familyNode',
    position: { x: 0, y: 0 },
    data: {
      name: 'Sadaan khan',
      code: 'SK',
      status: 'Living',
      year: '2005',
    },
  },
  {
    id: '7',
    type: 'familyNode',
    position: { x: 0, y: 0 },
    data: {
      name: 'Zeeshan Afzal',
      status: 'Living',
      year: '2005',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%2011-ywmedROIYSNQ9yEdGx1sk2ANiJ7NyZ.png',
    },
  },
  {
    id: '8',
    type: 'familyNode',
    position: { x: 0, y: 0 },
    data: {
      name: 'Ehtisham Afzal',
      status: 'Living',
      year: '2002',
      image: '/Ehtisham.png',
    },
  },
  {
    id: '9',
    type: 'familyNode',
    position: { x: 0, y: 0 },
    
    data: {
      name: 'Ihmad sinan',
      code: 'IS',
      status: 'Living',
      year: '2012',
    },
  },
  {
    id: '10',
    type: 'familyNode',
    position: { x: 0, y: 0 },
    data: {
      name: 'Rohan ullah',
      code: 'RU',
      status: 'Living',
    },
  },
  {
    id: '11',
    type: 'familyNode',
    position: { x: 0, y: 0 },
    data: {
      name: 'Ihrar ullah',
      code: 'IU',
      status: 'Living',
    },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2',type: 'smoothstep' },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep'},
  { id: 'e2-5', source: '2', target: '5', type: 'smoothstep' },
  { id: 'e3-6', source: '3', target: '6', type: 'smoothstep' },
  { id: 'e3-7', source: '4', target: '7', type: 'smoothstep' },
  { id: 'e4-8', source: '4', target: '8', type: 'smoothstep' },
  { id: 'e5-9', source: '4', target: '9', type: 'smoothstep' },
  { id: 'e5-10', source: '5', target: '10', type: 'smoothstep' },
  { id: 'e5-11', source: '5', target: '11', type: 'smoothstep' },
]

// Get the initial layout
const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
)

export default function FamilyTree() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges)

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  // Re-apply layout on window resize
  useLayoutEffect(() => {
    const handleResize = () => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges
      )
      setNodes([...layoutedNodes])
      setEdges([...layoutedEdges])
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [nodes, edges, setNodes, setEdges])

  return (
    <div className="w-full h-[800px] border rounded-lg bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionMode={ConnectionMode.Strict}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}

