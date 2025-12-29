import React, { useState, useEffect } from 'react';
import { 
  Dna, Upload, FileText, Activity, LogOut, User, 
  ChevronRight, AlertTriangle, CheckCircle, Download, 
  Database, BarChart2, Shield, Play, X, Settings, 
  Users, Calendar, FileCode, Menu, Sun, Bell, Info, 
  TrendingUp, MapPin
} from 'lucide-react';

// --- 模拟数据与常量 ---
const TEAM_MEMBERS = [
  { name: "Liu Tangjun", role: "Project Leader & Deep Learning (LSTM)", id: "0195863169" },
  { name: "Quincy Ng Tze Ern", role: "Data Pipeline & Analysis", id: "0123983568" },
  { name: "Liaw Zi Qi Joann", role: "Feature Engineer (MAFFT/Entropy)", id: "0179935932" },
  { name: "Mok Ziyit", role: "Machine Learning (Random Forest)", id: "0183808202" },
  { name: "Lleyton Lum Yao Man", role: "System Developer & Visualization", id: "0178462338" }
];

const RECENT_FILES = [
  { id: 1, name: "DENV_Sample_SG_2024.fasta", date: "2024-12-25", size: "2.4 MB", status: "Analyzed", type: "fasta" },
  { id: 2, name: "Batch_MY_Selangor_03.fasta", date: "2024-12-23", size: "5.1 MB", status: "Analyzed", type: "fasta" },
  { id: 3, name: "GenBank_Export_Ref.csv", date: "2024-12-20", size: "1.2 MB", status: "Pending", type: "csv" },
];

// --- 组件: 文件预览弹窗 ---
const FilePreviewModal = ({ file, onClose }) => {
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileCode className="text-blue-600 dark:text-blue-400" size={20} />
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm">{file.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{file.size} • Read-only Preview</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-0 overflow-auto bg-slate-50 dark:bg-slate-900 flex-1 font-mono text-xs">
          {file.type === 'fasta' ? (
            <div className="p-4 text-slate-600 dark:text-slate-300">
              <span className="text-blue-600 dark:text-blue-400 block mb-1">{`>Dengue_Virus_Type_2_Strain_SG_2025 | Collection_Date: 2025-01-15 | Region: Selangor`}</span>
              <p className="break-all leading-relaxed">
                AGCTTTCAATATGCTGAAACGCGAGAGAAACCGCGTGTCGACTGTGCAACAGCTGACAAAGAGATTCTCACTTGGA
                ATGCTGCAGGGACGAGGACCATTAAAACTGTTCATGGCCCTGGTGGCGTTCCTTCGTTTCCTAACAATCCCACCAA
                CAGCAGGGATATTGAAGAGATGGGGAACAATTAAAAAATCAAAAGCTATTAATGTTTTGAGAGGGTTCAGGAAAGA
                GATTGGAAGGATGCTGAACATCTTGAATAGGAGACGCAGATCTGCAGGCATGATCATTATGCTGATTCCAACAGTG
                ATGGCGTTCCATTTAACCACACGTAACGGAGAACCACACATGATCGTCAGCAGACAAGAGAAAGGGAAAAGTCTTC...
              </p>
              <div className="mt-4 text-slate-400 italic">[Preview truncated showing first 400bp]</div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="p-2 border-b border-r border-slate-300 dark:border-slate-700">ID</th>
                  <th className="p-2 border-b border-r border-slate-300 dark:border-slate-700">Collection_Date</th>
                  <th className="p-2 border-b border-r border-slate-300 dark:border-slate-700">Location</th>
                  <th className="p-2 border-b border-slate-300 dark:border-slate-700">Serotype</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                <tr>
                  <td className="p-2 border-b border-r border-slate-200 dark:border-slate-700">SEQ_001</td>
                  <td className="p-2 border-b border-r border-slate-200 dark:border-slate-700">2024-12-01</td>
                  <td className="p-2 border-b border-r border-slate-200 dark:border-slate-700">Subang Jaya</td>
                  <td className="p-2 border-b border-slate-200 dark:border-slate-700">DENV-2</td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-r border-slate-200 dark:border-slate-700">SEQ_002</td>
                  <td className="p-2 border-b border-r border-slate-200 dark:border-slate-700">2024-12-03</td>
                  <td className="p-2 border-b border-r border-slate-200 dark:border-slate-700">Petaling</td>
                  <td className="p-2 border-b border-slate-200 dark:border-slate-700">DENV-1</td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-r border-slate-200 dark:border-slate-700">SEQ_003</td>
                  <td className="p-2 border-b border-r border-slate-200 dark:border-slate-700">2024-12-05</td>
                  <td className="p-2 border-b border-r border-slate-200 dark:border-slate-700">Klang</td>
                  <td className="p-2 border-b border-slate-200 dark:border-slate-700">DENV-2</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 组件: 处理中界面 ---
const ProcessingScreen = ({ onComplete, onCancel, modelType }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const steps = [
      "Initializing secure environment...",
      "Validating File format integrity...",
      "Cleaning sequence data: Removing invalid chars...",
      "Running MAFFT Multiple Sequence Alignment...",
      "Alignment Score: 98.5% (Consensus reached)",
      "Feature Engineering: Calculating K-mer frequencies...",
      "Feature Engineering: Computing Shannon Entropy...",
      `Initializing ${modelType === 'lstm' ? 'LSTM Neural Network' : 'Random Forest Classifier'}...`,
      "Loading pre-trained weights (v2.1)...",
      "Running Inference on 10,700 nucleotides...",
      "Detecting Mutation Hotspots (E-Gene target)...",
      "Generating Visualization Assets..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setLogs(prev => [...prev, steps[i]]);
        setProgress(Math.floor(((i + 1) / steps.length) * 100));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 600); 

    return () => clearInterval(interval);
  }, [onComplete, modelType]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-sm p-6 text-white animate-fade-in">
      <button onClick={onCancel} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full transition-colors">
        <X size={32} />
      </button>

      <div className="w-full max-w-lg text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <svg className="animate-spin w-full h-full text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">{progress}%</div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Processing Genome Data</h2>
        <p className="text-slate-400 mb-8 text-sm">Pipeline Active: {modelType === 'lstm' ? 'Time-Series Prediction (LSTM)' : 'Baseline Classification (Random Forest)'}</p>
        
        <div className="bg-black/50 p-6 rounded-xl font-mono text-xs text-left h-64 overflow-y-auto border border-slate-700 shadow-inner">
          {logs.map((log, idx) => (
            <div key={idx} className="mb-2 text-green-400 border-l-2 border-green-600 pl-2">
              <span className="text-slate-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
              {log}
            </div>
          ))}
          <div className="animate-pulse text-green-500">_</div>
        </div>
      </div>
    </div>
  );
};

// --- 主应用组件 ---
export default function DenguePredApp() {
  const [settingsTab, setSettingsTab] = useState('account');
  const [themeMode, setThemeMode] = useState('light');
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('login'); 
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModel, setSelectedModel] = useState('lstm');
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // States for new features/fixes
  const [previewFile, setPreviewFile] = useState(null);
  const [useMafft, setUseMafft] = useState(true);
  const [useEntropy, setUseEntropy] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (screen) => {
    setActiveTab(screen);
    setShowResults(false);
    setIsMobileMenuOpen(false); 
    if (screen === 'analysis') setFile(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentScreen('app');
    setActiveTab('dashboard');
  };

  const startAnalysis = () => {
    if (!file) return alert("Please upload a file first.");
    setIsProcessing(true);
  };

  // --- 子页面渲染 ---

  // 1. 仪表盘
  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Overview of Mutation Surveillance</p>
        </div>
        <div className="bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <Calendar size={16} /> Dec 2025
        </div>
      </div>

      {/* Epidemic Status Overview */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white">Current Epidemic Status</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            <span className="font-bold text-red-500">Alert Level: High.</span> Recent surveillance data indicates a <strong>15% increase</strong> in Dengue cases in the Selangor region compared to last month. 
            AI models predict a potential outbreak peak in <strong>2 weeks</strong> due to emerging mutations in Serotype 2.
          </p>
          <div className="flex gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><MapPin size={12}/> Hotspot: Subang Jaya</span>
            <span className="flex items-center gap-1"><Dna size={12}/> Strain: DENV-2 (Mutated)</span>
          </div>
        </div>
        
        {/* Simple Simulated Chart (Trend) */}
        <div className="flex-1 h-32 flex items-end justify-between gap-1 px-4 border-b border-l border-slate-200 dark:border-slate-600 pb-1">
          {[30, 35, 32, 40, 45, 50, 65, 70, 60, 80, 85, 95].map((h, i) => (
             <div key={i} className="w-full h-full bg-blue-200 dark:bg-blue-900 relative group rounded-t-sm overflow-hidden">
               {/* Fixed: Added h-full above, and using absolute positioning for bar */}
               <div 
                 style={{ height: `${h}%` }} 
                 className={`absolute bottom-0 w-full transition-all duration-1000 ${i > 8 ? 'bg-red-500 dark:bg-red-600' : 'bg-blue-500 dark:bg-blue-600'}`}
               ></div>
               <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-1 rounded whitespace-nowrap z-10">
                 Week {i+1}: {h} cases
               </div>
             </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Sequences Analyzed", val: "12,450", icon: Database, color: "text-blue-600" },
          { label: "High Risk Hotspots", val: "3", icon: AlertTriangle, color: "text-red-500" },
          { label: "Model Accuracy", val: "94.2%", icon: Shield, color: "text-green-600" },
          { label: "Active Serotypes", val: "4", icon: Dna, color: "text-purple-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-900 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stat.val}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Predict Viral Mutations</h3>
            <p className="text-blue-100 text-sm mb-6 max-w-md">
              Upload FASTA sequences to detect potential mutations in the Envelope (E) protein using our LSTM model.
            </p>
            <button 
              onClick={() => navigateTo('analysis')}
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <Play size={18} fill="currentColor" /> Start New Analysis
            </button>
          </div>
          <Dna size={200} className="absolute -right-10 -bottom-10 text-white/10 rotate-45" />
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-sm">System Health</h3>
          <div className="space-y-4">
            {[
              { label: "API Gateway", status: "Operational" },
              { label: "LSTM Model Node", status: "Idle" },
              { label: "Database (PostgreSQL)", status: "Connected" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                <span className="text-green-600 dark:text-green-400 font-bold">{item.status}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <p className="text-[10px] text-slate-400">Last maintenance: 2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. 分析与上传
  const renderAnalysis = () => (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {!showResults ? (
        <>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <button onClick={() => navigateTo('dashboard')} className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</button>
            <ChevronRight size={14} />
            <span className="text-slate-800 dark:text-white font-bold">New Analysis</span>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Configuration Pipeline</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                
                {/* Upload Label with Tooltip */}
                <div className="flex items-center gap-2 mb-2 relative group w-fit">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">1. Upload Genome Data</label>
                  <Info size={16} className="text-slate-400 cursor-help hover:text-blue-500 transition-colors" />
                  <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-slate-700">
                    <div className="mb-2">
                      <span className="font-bold text-blue-300 block mb-1">FASTA Format (.fasta)</span>
                      Text-based format for representing nucleotide sequences.
                    </div>
                    <div>
                      <span className="font-bold text-green-300 block mb-1">CSV Format (.csv)</span>
                      Structured dataset containing metadata and sequences.
                    </div>
                    <div className="absolute left-6 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900"></div>
                  </div>
                </div>

                <div 
                  onClick={() => setFile({ name: "DENV_Seq_Batch_2025.csv", size: "3.2 MB" })}
                  className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    file 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {file ? (
                    <>
                      <FileText size={40} className="text-green-600 dark:text-green-400 mb-2" />
                      <p className="font-bold text-slate-800 dark:text-white">{file.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{file.size}</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="mt-4 text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <Upload size={40} className="text-slate-400 dark:text-slate-500 mb-2" />
                      <p className="font-bold text-slate-600 dark:text-slate-300">Click to Upload File</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Supports .fasta, .csv (Max 500MB)</p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">2. Select Model</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setSelectedModel('rf')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        selectedModel === 'rf' 
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-600' 
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <span className="font-bold block mb-1">Random Forest</span>
                      Base classification model for feature ranking.
                    </button>
                    <button 
                      onClick={() => setSelectedModel('lstm')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        selectedModel === 'lstm' 
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-600' 
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <span className="font-bold block mb-1">LSTM (Deep)</span>
                      Time-series prediction for mutation hotspots.
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">3. Preprocessing</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={useMafft} 
                        onChange={(e) => setUseMafft(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500" 
                      />
                      Auto-align sequences (MAFFT)
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={useEntropy} 
                        onChange={(e) => setUseEntropy(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500" 
                      />
                      Calculate Shannon Entropy
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button 
                onClick={startAnalysis}
                className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
                  file ? 'bg-blue-600 hover:bg-blue-700 shadow-lg' : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                }`}
              >
                Run Prediction Engine
              </button>
            </div>
          </div>
        </>
      ) : (
        renderResults()
      )}
    </div>
  );

  // 3. 结果详情
  const renderResults = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Analysis Results</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">File: DENV_Seq_Batch_2025.fasta | Model: {selectedModel.toUpperCase()}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigateTo('analysis')} className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
            New Analysis
          </button>
          <button className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/50 p-4 rounded-xl flex items-start gap-3">
        <AlertTriangle className="text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="text-sm font-bold text-orange-900 dark:text-orange-300">Critical Mutation Detected</h3>
          <p className="text-xs text-orange-800 dark:text-orange-400 mt-1">
            High entropy detected at E-Gene positions 142 and 288. Predicted mutation probability exceeds 85% for the next seasonal cycle.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white">Mutation Probability Heatmap</h3>
            <div className="flex gap-2">
              <span className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">X: Genome Position</span>
              <span className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">Y: Entropy</span>
            </div>
          </div>
          
          <div className="h-64 w-full flex items-end gap-[2px] pt-4 pb-0 px-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 relative">
            <div className="absolute left-2 top-2 text-[10px] text-slate-400">Prob 1.0</div>
            
            {Array.from({ length: 60 }).map((_, i) => {
              const isHotspot = (i > 15 && i < 20) || (i > 45 && i < 50);
              const height = isHotspot ? 70 + Math.random() * 30 : 10 + Math.random() * 20;
              const color = isHotspot 
                ? 'bg-gradient-to-t from-red-500 to-red-400' 
                : 'bg-gradient-to-t from-blue-300 to-blue-200 dark:from-blue-700 dark:to-blue-600';
              
              return (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t-sm hover:opacity-80 transition-all group relative ${color}`} 
                  style={{ height: `${height}%` }}
                >
                  <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded z-20 whitespace-nowrap">
                    Pos {100 + i*10}: {(height/100).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-mono">
            <span>Pos 100 (C)</span>
            <span>Pos 700 (E-Gene End)</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col transition-colors">
          <h3 className="font-bold text-slate-800 dark:text-white mb-4">Top Predictions</h3>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <tr>
                  <th className="pb-2">Pos</th>
                  <th className="pb-2">Region</th>
                  <th className="pb-2">Change</th>
                  <th className="pb-2">Prob</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                {[
                  { p: 142, r: 'E-Gene', c: 'A → G', s: 0.89, alert: true },
                  { p: 288, r: 'E-Gene', c: 'T → C', s: 0.76, alert: true },
                  { p: 104, r: 'NS1', c: 'G → A', s: 0.45, alert: false },
                  { p: 512, r: 'NS3', c: 'C → T', s: 0.32, alert: false },
                  { p: 620, r: 'NS5', c: 'A → T', s: 0.12, alert: false },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-50 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="py-3 font-mono text-xs">{row.p}</td>
                    <td className="py-3">{row.r}</td>
                    <td className="py-3 text-xs">{row.c}</td>
                    <td className={`py-3 font-bold ${row.alert ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {(row.s * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. 数据仓库
  const renderRepo = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Data Repository</h2>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">
            <tr>
              <th className="px-6 py-4">File Name</th>
              <th className="px-6 py-4">Date Uploaded</th>
              <th className="px-6 py-4">Size</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {RECENT_FILES.map((file) => (
              <tr key={file.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200 flex items-center gap-3">
                  <FileCode size={18} className="text-blue-500" />
                  {file.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{file.date}</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{file.size}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    file.status === 'Analyzed' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {file.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => setPreviewFile(file)}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 5. 团队页面
  const renderTeam = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Project Team (Group 20)</h2>
        <p className="text-slate-500 dark:text-slate-400">Capstone Project: Predicting Dengue Virus Mutations Using Machine Learning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAM_MEMBERS.map((member, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center transition-colors">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 mb-4 font-bold text-xl">
              {member.name.charAt(0)}
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white text-lg">{member.name}</h3>
            <p className="text-blue-600 dark:text-blue-400 text-xs font-medium mb-1">{member.id}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">{member.role}</p>
          </div>
        ))}
        
        {/* Supervisor Card */}
        <div className="bg-slate-800 dark:bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm flex flex-col items-center text-center text-white">
          <div className="w-16 h-16 bg-slate-700 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-4 font-bold text-xl">
            AH
          </div>
          <h3 className="font-bold text-lg">Dr. Abdul Hadi Mohamad</h3>
          <p className="text-slate-400 text-sm mt-2">Project Supervisor</p>
        </div>

        {/* New: Industry Client Card */}
        <div className="bg-slate-900 dark:bg-black p-6 rounded-xl border border-slate-700 shadow-sm flex flex-col items-center text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-bl">CLIENT</div>
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-yellow-500 mb-4 font-bold text-xl border border-slate-700">
            W
          </div>
          <h3 className="font-bold text-lg">Prof. Wong Eng Hwa</h3>
          <p className="text-slate-400 text-sm mt-2">Industry Client</p>
        </div>
      </div>
    </div>
  );

  // 6. 设置页面
  const renderSettings = () => (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">System Preferences</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px] transition-colors">
        <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-100 dark:border-slate-700 p-4">
          <nav className="space-y-1">
            {[
              { id: 'account', label: 'Account Profile', icon: User },
              { id: 'appearance', label: 'Appearance', icon: Sun },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'legal', label: 'About & Legal', icon: Shield },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSettingsTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                  settingsTab === item.id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-8">
          {settingsTab === 'account' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-4">Researcher Profile</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  LT
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-lg">Liu Tangjun</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Project Leader & Lead Developer</p>
                  <p className="text-blue-600 dark:text-blue-400 text-xs font-mono mt-1">ID: 0195863169</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Email Address</label>
                  <input type="text" value="liutangjun@group20.org" readOnly className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Department</label>
                  <input type="text" value="AI & Bioinformatics Lab" readOnly className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-200 text-sm" />
                </div>
              </div>
            </div>
          )}

          {settingsTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-4">Display Settings</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Interface Theme</label>
                <div className="grid grid-cols-3 gap-4">
                  <button 
                    onClick={() => setThemeMode('light')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      themeMode === 'light' 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-200' 
                      : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm"></div>
                    <span className="text-xs font-bold">Light Mode</span>
                  </button>
                  <button 
                    onClick={() => setThemeMode('dark')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      themeMode === 'dark' 
                      ? 'border-blue-600 bg-slate-800 text-white ring-2 ring-blue-500 dark:ring-blue-900' 
                      : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700"></div>
                    <span className="text-xs font-bold">Dark Mode</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Accessibility</label>
                <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white text-sm">Grayscale Mode</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Reduce eye strain by removing all colors.</div>
                  </div>
                  <button 
                    onClick={() => setIsGrayscale(!isGrayscale)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isGrayscale ? 'bg-slate-800 dark:bg-slate-200' : 'bg-slate-200 dark:bg-slate-600'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${isGrayscale ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {settingsTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { title: "High Risk Alerts", desc: "Notify when mutation probability > 80%", default: true },
                  { title: "Analysis Completion", desc: "Email me when batch processing is done", default: true },
                  { title: "System Updates", desc: "Receive weekly maintenance reports", default: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                    <div>
                      <div className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                    </div>
                    <input type="checkbox" defaultChecked={item.default} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {settingsTab === 'legal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-4">About & Compliance</h3>
              
              <div className="prose prose-sm text-slate-600 dark:text-slate-300 max-h-80 overflow-y-auto pr-2">
                <h4 className="font-bold text-slate-800 dark:text-white">Version Information</h4>
                <p className="text-xs mb-4">DenguePred AI v1.0.0 (Build 2025.12.27)<br/>Developed by Group 20 Capstone Team.</p>
                
                <h4 className="font-bold text-slate-800 dark:text-white">Terms and Conditions</h4>
                <p className="text-xs mb-2">
                  1. <strong>Usage Policy:</strong> This software is intended for academic and research purposes only. The predictions generated by the LSTM and Random Forest models should not be used as the sole basis for clinical diagnosis or public health policy without secondary validation.
                </p>
                <p className="text-xs mb-4">
                  2. <strong>Data Privacy:</strong> All uploaded FASTA genomic sequences are processed locally within the session and are not stored permanently on external servers, complying with the Personal Data Protection Act (PDPA) 2010.
                </p>

                <h4 className="font-bold text-slate-800 dark:text-white">Open Source Licenses</h4>
                <p className="text-xs">
                  This project utilizes open-source libraries including React, Tailwind CSS, BioPython, and TensorFlow.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // --- 主渲染逻辑 ---
  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="p-8 bg-blue-600 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
              <Dna size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">DenguePred AI</h1>
            <p className="text-blue-100 text-sm">Genomic Surveillance Platform</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Researcher ID</label>
              <input type="text" defaultValue="admin@group20.org" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
              <input type="password" defaultValue="password" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition-all flex justify-center gap-2 items-center">
              Login to System <ChevronRight size={16} />
            </button>
          </form>
          <div className="p-4 bg-slate-50 text-center text-xs text-slate-400 border-t border-slate-100">
            Authorized Personnel Only • Group 20 Capstone
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 flex transition-all duration-500 ${isGrayscale ? 'grayscale' : ''} ${themeMode === 'dark' ? 'dark' : ''}`}
      style={{ backgroundColor: themeMode === 'dark' ? '#0f172a' : '#f8fafc' }}
    >
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation - Bug Fix 3: Logic for mobile toggle */}
      <aside className={`
        w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 
        flex flex-col fixed h-full z-40 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} 
        md:translate-x-0 md:shadow-none
      `}>
        <div className="p-6 flex items-center justify-between md:justify-start gap-3 text-blue-700 dark:text-blue-400 font-bold text-xl border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-slate-700 rounded-lg"><Dna size={24} /></div>
            DenguePred
          </div>
          {/* Close button for mobile */}
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-500">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase px-4 mb-2 mt-4">Main Menu</div>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Activity },
            { id: 'analysis', label: 'Analysis', icon: Play },
            { id: 'repo', label: 'Repository', icon: Database },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}

          <div className="text-xs font-bold text-slate-400 uppercase px-4 mb-2 mt-8">System</div>
          {[
            { id: 'team', label: 'Team Members', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          <button onClick={() => setCurrentScreen('login')} className="w-full flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        <div className="md:hidden flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400">
            <Dna size={24} /> DenguePred
          </div>
          {/* Bug Fix 3: Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-slate-600 dark:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <Menu />
          </button>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'analysis' && renderAnalysis()}
        {activeTab === 'repo' && renderRepo()}
        {activeTab === 'team' && renderTeam()}
        {activeTab === 'settings' && renderSettings()}
      </main>

      {/* Processing Overlay Modal */}
      {isProcessing && (
        <ProcessingScreen 
          modelType={selectedModel}
          onCancel={() => setIsProcessing(false)}
          onComplete={() => {
            setIsProcessing(false);
            setShowResults(true);
          }} 
        />
      )}

      {/* Bug Fix 1: File Preview Modal */}
      {previewFile && (
        <FilePreviewModal 
          file={previewFile} 
          onClose={() => setPreviewFile(null)} 
        />
      )}
    </div>
  );
}