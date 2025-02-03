To use multiple versions of  **Node.js**  for different projects using **NVM (Node Version Manager) on Windows**

---

### **Step 1: Install NVM (if not already installed)**
Make sure you have **NVM for Windows** installed. If not, follow the installation steps in my previous response.

Check if NVM is installed:

```sh
nvm version
```

If installed correctly, it will show the NVM version.

---

### **Step 2: Install Different Node.js Versions**
You can install multiple versions of Node.js using:

```sh
nvm install 16.20.2
nvm install 18.17.1
nvm install 20.6.0
```

---

### **Step 3: Create Projects and Use Different Node Versions**
Let's say you have two projects:
- **Project A** (requires Node.js **16.20.2**)
- **Project B** (requires Node.js **18.17.1**)

#### **Step 3.1: Switch Node.js Version for a Project**
1. **Navigate to Project A's folder** in **Command Prompt** or **PowerShell**:

   ```sh
   cd C:\Users\YourUser\Projects\ProjectA
   ```

2. **Set Node.js version for Project A**:

   ```sh
   nvm use 16.20.2
   ```

3. **Verify the Node.js version**:

   ```sh
   node -v
   ```

---

4. Now, **switch to Project B**:

   ```sh
   cd C:\Users\YourUser\Projects\ProjectB
   ```

5. **Change the Node.js version for Project B**:

   ```sh
   nvm use 18.17.1
   ```

6. **Verify**:

   ```sh
   node -v
   ```

Now, **Project A** runs on **Node.js 16.20.2**, while **Project B** runs on **Node.js 18.17.1**.

---

### **Step 4: Automate Node.js Version Switching Using .nvmrc (Optional)**
Instead of manually running `nvm use`, you can create a `.nvmrc` file in each project folder.

#### **For Project A (Node.js 16.20.2)**
1. Inside **Project A**, create a file named **`.nvmrc`**.
2. Add the required Node.js version inside:

   ```
   16.20.2
   ```

#### **For Project B (Node.js 18.17.1)**
1. Inside **Project B**, create a file named **`.nvmrc`**.
2. Add the required Node.js version:

   ```
   18.17.1
   ```

Now, whenever you switch to a project directory, just run:

```sh
nvm use
```

It will automatically read the version from `.nvmrc` and switch to the correct one.

---

### **Step 5: Check Active Node.js Version at Any Time**
If you ever need to check which Node.js version is active:

```sh
node -v
```

---

### **Final Thoughts**
- You can easily switch between Node.js versions per project using `nvm use` or `.nvmrc`.  
- Each project can have its own Node.js version without conflicts.  
- Automate switching using `.nvmrc` for convenience.

