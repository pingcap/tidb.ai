import type { Meta, StoryObj } from '@storybook/react';
import { RemarkContent } from './remark-content';

const meta = {
  title: 'Components/RemarkContent',
  component: RemarkContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minWidth: 400, maxWidth: 800 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      type: 'string',
    },
  },
  args: {},
} satisfies Meta<typeof RemarkContent>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: `TiDB is an open-source, distributed SQL database that supports Hybrid Transactional and Analytical Processing (HTAP) workloads[^1]. It is designed to provide a scalable, highly available, and MySQL-compatible database solution for large-scale data management. Here's a comprehensive overview of TiDB:

Key Features:

1. Horizontal Scalability: TiDB's architecture separates computing from storage, allowing you to scale out or scale in the computing or storage capacity independently as needed[^2].

2. High Availability: TiDB ensures financial-grade high availability through its multi-replica architecture and Multi-Raft protocol. Data is stored in multiple replicas, and a transaction is only committed when the majority of replicas have successfully written the data[^2].

3. MySQL Compatibility: TiDB is compatible with the MySQL 5.7 protocol, common features, and syntax. This allows for easy migration of existing MySQL applications to TiDB with minimal code changes[^3].

4. HTAP Capabilities: TiDB supports both Online Transactional Processing (OLTP) and Online Analytical Processing (OLAP) workloads. It achieves this through its two storage engines: TiKV (row-based) for transactional processing and TiFlash (columnar) for analytical processing[^1][^2].

5. Cloud-Native Design: TiDB is built for cloud environments, offering flexible scalability, reliability, and security on various cloud platforms. It integrates seamlessly with Kubernetes through TiDB Operator[^2].

Architecture:

TiDB's architecture consists of several key components:

1. TiDB Server: This is the SQL layer that handles query parsing, optimization, and execution[^4].

2. TiKV: A distributed key-value storage engine that stores the actual data[^4].

3. Placement Driver (PD): The cluster manager that handles metadata management, timestamp allocation, and data placement decisions[^4].

4. TiFlash: A columnar storage engine that replicates data from TiKV in real-time, enabling fast analytical processing[^2].

5. TiDB Binlog: A tool for capturing and replicating data changes in TiDB[^3].

High Availability and Scalability:

TiDB achieves high availability and scalability through several mechanisms:

1. Multi-Raft Protocol: This ensures data consistency across replicas and allows for automatic failover when a minority of replicas fail[^2].

2. Separation of Computing and Storage: This architecture allows for independent scaling of compute and storage resources, enabling flexible adaptation to changing workloads[^2].

3. Automatic Sharding: TiDB automatically shards data across TiKV nodes, allowing for seamless horizontal scaling[^4].

4. Load Balancing: The Placement Driver continuously monitors the cluster and automatically balances data and workload across nodes[^4].

Example SQL:

Here's an example of how you might create a table and perform some basic operations in TiDB:

\`\`\`sql
-- Create a new table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some data
INSERT INTO users (name, email) VALUES 
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');

-- Query the data
SELECT * FROM users;

-- Update a record
UPDATE users SET email = 'alice.new@example.com' WHERE name = 'Alice';

-- Delete a record
DELETE FROM users WHERE name = 'Bob';
\`\`\`

This example demonstrates basic SQL operations that you can perform in TiDB, showcasing its MySQL compatibility.

[^1]: [TiDB Introduction | PingCAP Docs](https://docs.pingcap.com/tidb/v7.1/tidb-faq#what-is-tidb)
[^2]: [TiDB Key Features | PingCAP Docs](https://docs.pingcap.com/tidb/v7.5/overview#key-features)
[^3]: [TiDB Architecture | PingCAP Docs](https://docs.pingcap.com/tidb/v7.1/tidb-architecture)
[^4]: [TiDB Architecture Components | PingCAP Docs](https://docs.pingcap.com/tidb/v7.1/tidb-architecture#tidb-architecture)
`,
  },
};
