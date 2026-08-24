window.CKA_CHALLENGES = [
  {
    id: "storage",
    title: "Storage",
    weight: 10,
    color: "mint",
    competencies: [
      { id: "storage-classes", title: "Implement storage classes and dynamic volume provisioning", videoId: "", practice: [] },
      { id: "volume-types", title: "Configure volume types, access modes and reclaim policies", videoId: "", practice: [] },
      { id: "persistent-volumes", title: "Manage persistent volumes and persistent volume claims", videoId: "", practice: [] }
    ]
  },
  {
    id: "workloads-scheduling",
    title: "Workloads & Scheduling",
    weight: 15,
    color: "violet",
    competencies: [
      { id: "deployments", title: "Understand application deployments, rolling updates and rollbacks", videoId: "", practice: [] },
      { id: "configmaps-secrets", title: "Use ConfigMaps and Secrets to configure applications", videoId: "", practice: [] },
      { id: "autoscaling", title: "Configure workload autoscaling", videoId: "", practice: [] },
      { id: "self-healing", title: "Create robust, self-healing application deployments", videoId: "", practice: [] },
      { id: "admission-scheduling", title: "Configure Pod admission and scheduling (limits, node affinity, and more)", videoId: "", practice: [] }
    ]
  },
  {
    id: "services-networking",
    title: "Services & Networking",
    weight: 20,
    color: "blue",
    competencies: [
      { id: "pod-connectivity", title: "Understand connectivity between Pods", videoId: "", practice: [] },
      { id: "network-policies", title: "Define and enforce Network Policies", videoId: "", practice: [] },
      { id: "service-types", title: "Use ClusterIP, NodePort and LoadBalancer service types and endpoints", videoId: "", practice: [] },
      { id: "gateway-api", title: "Use the Gateway API to manage Ingress traffic", videoId: "", practice: [] },
      { id: "ingress", title: "Use Ingress controllers and Ingress resources", videoId: "", practice: [] },
      { id: "coredns", title: "Understand and use CoreDNS", videoId: "", practice: [] }
    ]
  },
  {
    id: "cluster-architecture",
    title: "Cluster Architecture, Installation & Configuration",
    weight: 25,
    color: "amber",
    competencies: [
      { id: "rbac", title: "Manage role-based access control (RBAC)", videoId: "", practice: [] },
      { id: "infrastructure", title: "Prepare underlying infrastructure for installing a Kubernetes cluster", videoId: "", practice: [] },
      { id: "kubeadm", title: "Create and manage Kubernetes clusters using kubeadm", videoId: "", practice: [] },
      { id: "cluster-lifecycle", title: "Manage the lifecycle of Kubernetes clusters", videoId: "", practice: [] },
      { id: "ha-control-plane", title: "Implement and configure a highly available control plane", videoId: "", practice: [] },
      { id: "helm-kustomize", title: "Use Helm and Kustomize to install cluster components", videoId: "", practice: [] },
      { id: "extension-interfaces", title: "Understand extension interfaces (CNI, CSI, CRI, and more)", videoId: "", practice: [] },
      { id: "crds-operators", title: "Understand CRDs, and install and configure operators", videoId: "", practice: [] }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    weight: 30,
    color: "coral",
    competencies: [
      { id: "clusters-nodes", title: "Troubleshoot clusters and nodes", videoId: "", practice: [] },
      { id: "cluster-components", title: "Troubleshoot cluster components", videoId: "", practice: [] },
      { id: "resource-usage", title: "Monitor cluster and application resource usage", videoId: "", practice: [] },
      { id: "container-output", title: "Manage and evaluate container output streams", videoId: "", practice: [] },
      { id: "services-networking-troubleshooting", title: "Troubleshoot services and networking", videoId: "", practice: [] }
    ]
  }
];

