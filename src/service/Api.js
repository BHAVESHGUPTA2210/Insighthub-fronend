const API_BASE = process.env.REACT_APP_BACKEND_URL;
console.log(API_BASE);

// AbortController for canceling requests
let currentController = null;

/**
 * Cancel the current in-progress request
 */
export const cancelRequest = () => {
  if (currentController) {
    console.log('🛑 Cancelling ongoing request...');
    currentController.abort();
    currentController = null;
  }
};

/**
 * Main QA service function with searchType parameter
 * searchType can be: "project", "web", or "auto"
 */
export const getQAAnswer = async (projectKey, question, searchType = "auto") => {
  console.log('📡 Calling backend API:', { projectKey, question, searchType });
  
  // Cancel any existing request
  cancelRequest();
  
  // Create new AbortController for this request
  currentController = new AbortController();
  const { signal } = currentController;
  
  // Validate searchType
  const validSearchTypes = ["project", "web", "auto"];
  const finalSearchType = validSearchTypes.includes(searchType) ? searchType : "auto";
  
  try {
    const response = await fetch(`${API_BASE}/qa`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        projectKey, 
        question, 
        searchType: finalSearchType 
      }),
      signal, // Attach abort signal
    });

    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('📡 API error:', errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('📡 API response received for project:', projectKey);
    console.log('📡 Search type used:', data.searchType || data.source || finalSearchType);
    
    // Clear controller after successful completion
    currentController = null;
    return data;
    
  } catch (error) {
    // Clear controller on error
    currentController = null;
    
    // Handle abort error specially
    if (error.name === 'AbortError' || error.message === 'The user aborted a request.') {
      console.log('📡 Request was cancelled by user');
      throw new Error('Request cancelled');
    }
    
    console.error("📡 Service Error:", error);
    return { 
      answer: `**⚠️ Connection Error**\n\nError: ${error.message}\n\nProject: ${projectKey}\nSearch Type: ${searchType}\n\nPlease make sure the backend server is running.\n\nStart it with: node server.js`,
      error: error.message,
      project: projectKey,
      searchType: searchType
    };
  }
};

/**
 * Check backend health with project info
 */
export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    return {
      ...data,
      connected: true,
      status: 'ok'
    };
  } catch (error) {
    return {
      status: 'error',
      connected: false,
      message: `Cannot connect to backend: ${error.message}`,
      suggestion: 'Run: node server.js in terminal',
      projectsSupported: []
    };
  }
};

/**
 * Get project configuration including search capabilities
 */
export const getProjectConfig = async (projectKey) => {
  try {
    const response = await fetch(`${API_BASE}/config/${projectKey}`);
    if (!response.ok) throw new Error('Config not found');
    const config = await response.json();
    
    // Ensure search capabilities are properly structured
    return {
      ...config,
      hasOpenAIKey: config.hasOpenAIKey || false,
      hasSearchKey: config.hasSearchKey || false,
      searchIndexName: config.searchIndexName || null,
      supportsWebSearch: config.supportsWebSearch || false,
      supportedSearchTypes: config.supportedSearchTypes || ["project"]
    };
    
  } catch (error) {
    console.warn('Could not fetch project config:', error.message);
    return {
      hasOpenAIKey: false,
      hasSearchKey: false,
      searchIndexName: null,
      supportsWebSearch: false,
      supportedSearchTypes: ["project"]
    };
  }
};

/**
 * Enhanced mock responses for offline testing with searchType support
 */
export const getMockAnswer = (projectKey, question, searchType = "project") => {
  console.log('🎭 Using mock response for project:', projectKey, 'searchType:', searchType);
  
  const projectSpecificResponses = {
    bidbot: {
      login: `## 🔐 BIDBOT Login Test Cases

### **Search Type:** ${searchType === "web" ? "🌐 Web Knowledge" : "🗂️ Project Knowledge"}
### **BidBot Platform Specific:**
✅ **TC-BIDBOT-LOGIN-001**: Auction house credentials
   - Username: auction@bidbot.com
   - Password: Bid@2024!
   - Expected: Access to live auctions

✅ **TC-BIDBOT-LOGIN-002**: Bidder authentication
   - Username: bidder123@bidbot.com
   - Password: BidNow!2024
   - Expected: Bidding dashboard

✅ **TC-BIDBOT-LOGIN-003**: Admin console access
   - Username: admin@bidbot.com
   - Password: Admin@Secure#2024
   - Expected: Full system control

### **Security Requirements:**
🔒 Two-factor authentication mandatory
🔒 Session timeout: 15 minutes for bidders
🔒 IP whitelisting for admin users

*BidBot specific login test cases: 8*`,

      auction: `## 🏷️ BidBot Auction System

### **Search Type:** ${searchType === "web" ? "🌐 Web Knowledge" : "🗂️ Project Knowledge"}
### **Auction Types:**
1. **Dutch Auction**: Price drops over time
2. **English Auction**: Price increases with bids
3. **Sealed-bid**: Single bid submission
4. **Reverse Auction**: Sellers compete for buyer

### **Testing Focus Areas:**
- Bid increment logic
- Auto-extension on late bids
- Proxy bidding system
- Reserve price validation
- Auction timer accuracy`
    },

    pve: {
      login: `## 🔐 PVE Platform Login Test Cases

### **Search Type:** ${searchType === "web" ? "🌐 Web Knowledge" : "🗂️ Project Knowledge"}
### **PVE System Access:**
✅ **TC-PVE-LOGIN-001**: Virtual environment access
   - Username: vmadmin@pve.com
   - Password: VM@Secure2024
   - Expected: Virtual machine dashboard

✅ **TC-PVE-LOGIN-002**: Container orchestration
   - Username: container@pve.com
   - Password: Docker@2024!
   - Expected: Kubernetes cluster access

✅ **TC-PVE-LOGIN-003**: Storage management
   - Username: storage@pve.com
   - Password: Storage#2024
   - Expected: SAN/NAS management console

### **Security Protocols:**
🔒 SSH key authentication
🔒 VLAN isolation
🔒 Network segmentation
🔒 Storage encryption

*PVE specific login test cases: 10*`,

      virtualization: `## 💻 PVE Virtualization Platform

### **Search Type:** ${searchType === "web" ? "🌐 Web Knowledge" : "🗂️ Project Knowledge"}
### **Virtualization Features:**
1. **Live Migration**: Zero-downtime VM transfer
2. **High Availability**: Automatic failover
3. **Backup/Restore**: Snapshot management
4. **Resource Pools**: CPU/Memory allocation

### **Testing Requirements:**
- VM creation time < 2 minutes
- Live migration success rate > 99.9%
- Resource overallocation prevention
- Network latency < 5ms between VMs`
    }
  };

  const lowerQuestion = question.toLowerCase();
  const projectLower = projectKey.toLowerCase();
  
  // Web search mock responses
  const webKnowledgeResponses = {
    login: `## 🌐 Web Knowledge: Authentication Systems

### **Source:** General web knowledge
### **Modern Authentication Methods:**

1. **OAuth 2.0 & OpenID Connect**
   - Standard protocol for authorization
   - Used by Google, Facebook, Microsoft
   - Supports Single Sign-On (SSO)

2. **Multi-Factor Authentication (MFA)**
   - Something you know (password)
   - Something you have (phone, token)
   - Something you are (biometrics)

3. **Passwordless Authentication**
   - WebAuthn/FIDO2 standards
   - Biometric authentication
   - Security keys (YubiKey)

### **Best Practices:**
✅ Use HTTPS for all authentication
✅ Implement rate limiting
✅ Store passwords with bcrypt/Argon2
✅ Regular security audits
✅ Session management with secure cookies

*This information is based on general web knowledge about authentication systems.*`,

    test: `## 🌐 Web Knowledge: Software Testing

### **Source:** General web knowledge
### **Testing Methodologies:**

1. **Agile Testing**
   - Test-driven development (TDD)
   - Behavior-driven development (BDD)
   - Continuous testing in CI/CD

2. **Test Types**
   - Unit Testing (Jest, JUnit, pytest)
   - Integration Testing
   - End-to-End Testing (Cypress, Selenium)
   - Performance Testing (JMeter, k6)

3. **Testing in DevOps**
   - Shift-left testing approach
   - Test automation frameworks
   - Monitoring and observability

### **Industry Standards:**
📊 ISTQB certification framework
📊 ISO/IEC/IEEE 29119 software testing standards
📊 Test maturity models (TMMi)

*General knowledge about software testing practices across the industry.*`
  };

  // Try web search responses first if searchType is "web"
  if (searchType === "web") {
    for (const [key, response] of Object.entries(webKnowledgeResponses)) {
      if (lowerQuestion.includes(key)) {
        return { 
          answer: response,
          project: projectKey,
          searchType: "web",
          source: "mock-web"
        };
      }
    }
    
    // Generic web response
    return {
      answer: `## 🌐 Web Knowledge Response

### **Source:** General web knowledge
### **Question:** "${question}"

### **Information from Web:**
Based on general web knowledge about ${lowerQuestion.includes('test') ? 'software testing' : 'technology topics'}.

### **Key Points:**
- This would typically involve searching across public documentation
- Web search provides broader industry context
- May include information from documentation sites, forums, and tech blogs

### **Note:**
This is a mock response simulating web search. In production, this would query:
- Microsoft Bing Search API
- Public documentation
- Technical forums and communities

*Search Type: Web Knowledge*`,
      project: projectKey,
      searchType: "web",
      source: "mock-web-general"
    };
  }

  // Try to find project-specific response for project search
  if (projectSpecificResponses[projectLower]) {
    for (const [key, response] of Object.entries(projectSpecificResponses[projectLower])) {
      if (lowerQuestion.includes(key)) {
        return { 
          answer: response,
          project: projectKey,
          searchType: "project",
          source: "mock-internal"
        };
      }
    }
  }

  // Generic fallback response for project search
  let answer = `## 📋 Project Knowledge Response

### **Search Type:** Project Knowledge
### **Question:** "${question}"

### **Project Context:**
- **Project**: ${projectKey}
- **Domain**: ${projectKey === 'bidbot' ? 'Auction Management System' : 
                  projectKey === 'pve' ? 'Virtualization Platform' : 'General Software Project'}
- **Environment**: Development/Testing

### **Project-Specific Information:**
This query would search through ${projectKey}'s internal documentation including:
1. Test cases and procedures
2. API documentation
3. System architecture diagrams
4. Deployment guides
5. Troubleshooting guides

### **Next Steps:**
1. Review ${projectKey} project documentation
2. Check existing test cases in test management system
3. Consult with project architects
4. Update documentation as needed

*Note: This is a development mock response for project knowledge search. Connect to Azure AI Search for real answers from ${projectKey} project documents.*`;

  return { 
    answer,
    project: projectKey,
    searchType: "project",
    source: "mock-project-general"
  };
};