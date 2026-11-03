import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Activity, X, Server, Tag, BarChart3, Radio, Share2, Layers, CheckCircle2, ChevronRight, Copy } from 'lucide-react';
import { akamai } from '../services/akamai';
import { gtm } from '../services/gtm';
import { analytics } from '../services/analytics';
import { criteo } from '../services/criteo';
import { branchService } from '../services/branch';
import { openGraph } from '../services/opengraph';

const FloatingBadge = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  background: #212121;
  color: #FFFFFF;
  border: 1px solid #42B549;
  border-radius: 999px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(3, 172, 14, 0.4);
    background: #03AC0E;
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #00E676;
    box-shadow: 0 0 8px #00E676;
  }
`;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 520px;
  max-width: 95vw;
  height: 100vh;
  background: #18191A;
  color: #E4E6EB;
  z-index: 1000;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  font-family: monospace, -apple-system, sans-serif;
  animation: slideLeft 0.25s ease-out;

  @keyframes slideLeft {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

const DrawerHeader = styled.div`
  padding: 16px 20px;
  background: #242526;
  border-bottom: 1px solid #3A3B3C;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  button {
    background: none;
    border: none;
    color: #B0B3B8;
    cursor: pointer;
    &:hover { color: #FFFFFF; }
  }
`;

const TabNavigation = styled.div`
  display: flex;
  background: #242526;
  border-bottom: 1px solid #3A3B3C;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => (props.active ? '#03AC0E' : '#B0B3B8')};
  border-bottom: 2px solid ${(props) => (props.active ? '#03AC0E' : 'transparent')};
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: #03AC0E;
  }
`;

const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const MetricCard = styled.div`
  background: #242526;
  border: 1px solid #3A3B3C;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 12px;

  .header {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #B0B3B8;
    margin-bottom: 6px;
  }

  .value {
    font-size: 18px;
    font-weight: 700;
    color: #03AC0E;
  }
`;

const LogEntry = styled.div`
  background: #242526;
  border-left: 3px solid #03AC0E;
  padding: 10px 14px;
  margin-bottom: 8px;
  border-radius: 0 6px 6px 0;
  font-size: 12px;

  .log-top {
    display: flex;
    justify-content: space-between;
    color: #03AC0E;
    font-weight: 700;
    margin-bottom: 4px;
  }

  pre {
    margin: 4px 0 0;
    font-size: 11px;
    color: #B0B3B8;
    white-space: pre-wrap;
    word-break: break-all;
  }
`;

const SocialPreviewBox = styled.div`
  background: #242526;
  border: 1px solid #3A3B3C;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;

  .preview-platform {
    background: #3A3B3C;
    padding: 6px 12px;
    font-size: 11px;
    font-weight: 700;
    color: #E4E6EB;
  }

  .preview-content {
    padding: 14px;

    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 10px;
    }

    h4 {
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0 0 6px;
    }

    p {
      font-size: 12px;
      color: #B0B3B8;
      margin: 0 0 8px;
    }

    .meta-url {
      font-size: 11px;
      color: #03AC0E;
    }
  }
`;

export default function AkamaiTelemetryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('akamai');
  const [akamaiState, setAkamaiState] = useState(akamai.getState());
  const [gtmLogs, setGtmLogs] = useState(gtm.getLogs());
  const [gaLogs, setGaLogs] = useState(analytics.getLogs());
  const [criteoLogs, setCriteoLogs] = useState(criteo.getLogs());
  const [branchLogs, setBranchLogs] = useState(branchService.getLogs());
  const [ogData, setOgData] = useState(openGraph.getMetaSummary());

  useEffect(() => {
    const u1 = akamai.subscribe(setAkamaiState);
    const u2 = gtm.subscribe(setGtmLogs);
    const u3 = analytics.subscribe(setGaLogs);
    const u4 = criteo.subscribe(setCriteoLogs);
    const u5 = branchService.subscribe(setBranchLogs);

    setOgData(openGraph.getMetaSummary());

    return () => {
      u1(); u2(); u3(); u4(); u5();
    };
  }, [isOpen]);

  return (
    <>
      <FloatingBadge onClick={() => setIsOpen(true)}>
        <span className="pulse-dot" />
        <Server size={15} />
        <span>Stack Inspector</span>
      </FloatingBadge>

      {isOpen && (
        <DrawerContainer>
          <DrawerHeader>
            <h3>
              <Server size={16} color="#03AC0E" />
              Tokopedia MPA Stack Inspector
            </h3>
            <button onClick={() => setIsOpen(false)} aria-label="Tutup Panel">
              <X size={18} />
            </button>
          </DrawerHeader>

          <TabNavigation>
            <TabButton active={activeTab === 'akamai'} onClick={() => setActiveTab('akamai')}>
              <Server size={13} /> Akamai CDN
            </TabButton>
            <TabButton active={activeTab === 'gtm'} onClick={() => setActiveTab('gtm')}>
              <Tag size={13} /> GTM ({gtmLogs.length})
            </TabButton>
            <TabButton active={activeTab === 'ga4'} onClick={() => setActiveTab('ga4')}>
              <BarChart3 size={13} /> GA4 ({gaLogs.length})
            </TabButton>
            <TabButton active={activeTab === 'criteo'} onClick={() => setActiveTab('criteo')}>
              <Radio size={13} /> Criteo ({criteoLogs.length})
            </TabButton>
            <TabButton active={activeTab === 'branch'} onClick={() => setActiveTab('branch')}>
              <Share2 size={13} /> Branch ({branchLogs.length})
            </TabButton>
            <TabButton active={activeTab === 'og'} onClick={() => setActiveTab('og')}>
              <Layers size={13} /> OpenGraph
            </TabButton>
          </TabNavigation>

          <DrawerBody>
            {activeTab === 'akamai' && (
              <div>
                <MetricCard>
                  <div className="header">
                    <span>AKAMAI EDGE CACHE STATUS</span>
                    <span>CGK REGION</span>
                  </div>
                  <div className="value">{akamaiState.cacheStatus} (Edge Node)</div>
                  <div style={{ fontSize: 11, color: '#B0B3B8', marginTop: 4 }}>
                    Edge Server: {akamaiState.edgeNode}
                  </div>
                </MetricCard>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                  <MetricCard>
                    <div className="header">mPulse TTFB</div>
                    <div className="value">{akamaiState.rumMetrics.ttfb}</div>
                  </MetricCard>
                  <MetricCard>
                    <div className="header">mPulse LCP</div>
                    <div className="value">{akamaiState.rumMetrics.lcp}</div>
                  </MetricCard>
                  <MetricCard>
                    <div className="header">mPulse CLS</div>
                    <div className="value">{akamaiState.rumMetrics.cls}</div>
                  </MetricCard>
                  <MetricCard>
                    <div className="header">mPulse FID</div>
                    <div className="value">{akamaiState.rumMetrics.fid}</div>
                  </MetricCard>
                </div>

                <MetricCard>
                  <div className="header">AKAMAI EDGEWORKER VERSION</div>
                  <div style={{ color: '#E4E6EB', fontSize: 13, fontWeight: 700 }}>
                    {akamaiState.edgeWorkerVersion}
                  </div>
                  <div style={{ fontSize: 11, color: '#03AC0E', marginTop: 4 }}>
                    ✓ Edge-Control: cache-maxage=86400, stale-while-revalidate=604800
                  </div>
                </MetricCard>

                <h4 style={{ fontSize: 12, color: '#B0B3B8', margin: '16px 0 8px' }}>
                  AKAMAI EDGE HEADERS & ACTIVITY LOGS:
                </h4>
                {akamaiState.logs.map((log) => (
                  <LogEntry key={log.id}>
                    <div className="log-top">
                      <span>{log.action}</span>
                      <span style={{ color: '#B0B3B8', fontSize: 10 }}>{log.timestamp}</span>
                    </div>
                    <pre>{JSON.stringify(log.data, null, 2)}</pre>
                  </LogEntry>
                ))}
              </div>
            )}

            {activeTab === 'gtm' && (
              <div>
                <MetricCard>
                  <div className="header">GOOGLE TAG MANAGER CONTAINER</div>
                  <div className="value">GTM-TKPD988</div>
                  <div style={{ fontSize: 11, color: '#B0B3B8', marginTop: 4 }}>
                    dataLayer size: {window.dataLayer?.length || 0} events
                  </div>
                </MetricCard>

                <h4 style={{ fontSize: 12, color: '#B0B3B8', margin: '16px 0 8px' }}>
                  DATALAYER LIVE EVENT STREAM:
                </h4>
                {gtmLogs.map((entry) => (
                  <LogEntry key={entry.id}>
                    <div className="log-top">
                      <span>{entry.eventName}</span>
                      <span style={{ color: '#B0B3B8', fontSize: 10 }}>{entry.timestamp}</span>
                    </div>
                    <pre>{JSON.stringify(entry.payload, null, 2)}</pre>
                  </LogEntry>
                ))}
              </div>
            )}

            {activeTab === 'ga4' && (
              <div>
                <MetricCard>
                  <div className="header">GA4 MEASUREMENT ID</div>
                  <div className="value">G-TKPD4892GA4</div>
                  <div style={{ fontSize: 11, color: '#B0B3B8', marginTop: 4 }}>
                    Enhanced E-Commerce Tracking Active
                  </div>
                </MetricCard>

                <h4 style={{ fontSize: 12, color: '#B0B3B8', margin: '16px 0 8px' }}>
                  GA4 E-COMMERCE EVENTS:
                </h4>
                {gaLogs.map((entry) => (
                  <LogEntry key={entry.id}>
                    <div className="log-top">
                      <span>{entry.eventName}</span>
                      <span style={{ color: '#B0B3B8', fontSize: 10 }}>{entry.timestamp}</span>
                    </div>
                    <pre>{JSON.stringify(entry.params, null, 2)}</pre>
                  </LogEntry>
                ))}
              </div>
            )}

            {activeTab === 'criteo' && (
              <div>
                <MetricCard>
                  <div className="header">CRITEO ONETAG RETARGETING</div>
                  <div className="value">Partner ID: 104829 (Tokopedia)</div>
                  <div style={{ fontSize: 11, color: '#B0B3B8', marginTop: 4 }}>
                    Site Type: 'd' (Desktop) • Email Hash: ce7382103f0b2f
                  </div>
                </MetricCard>

                <h4 style={{ fontSize: 12, color: '#B0B3B8', margin: '16px 0 8px' }}>
                  CRITEO ONETAG EVENT QUEUE:
                </h4>
                {criteoLogs.map((entry) => (
                  <LogEntry key={entry.id}>
                    <div className="log-top">
                      <span>{entry.event}</span>
                      <span style={{ color: '#B0B3B8', fontSize: 10 }}>{entry.timestamp}</span>
                    </div>
                    <pre>{JSON.stringify(entry.payload, null, 2)}</pre>
                  </LogEntry>
                ))}
              </div>
            )}

            {activeTab === 'branch' && (
              <div>
                <MetricCard>
                  <div className="header">BRANCH.IO WEB SDK</div>
                  <div className="value">key_live_kaY6xY7...</div>
                  <div style={{ fontSize: 11, color: '#B0B3B8', marginTop: 4 }}>
                    Deep Linking • Journeys Banner • Attribution Engine
                  </div>
                </MetricCard>

                <h4 style={{ fontSize: 12, color: '#B0B3B8', margin: '16px 0 8px' }}>
                  BRANCH ACTIVITY & DEEP LINKS:
                </h4>
                {branchLogs.map((entry) => (
                  <LogEntry key={entry.id}>
                    <div className="log-top">
                      <span>{entry.eventName}</span>
                      <span style={{ color: '#B0B3B8', fontSize: 10 }}>{entry.timestamp}</span>
                    </div>
                    <pre>{JSON.stringify(entry.payload, null, 2)}</pre>
                  </LogEntry>
                ))}
              </div>
            )}

            {activeTab === 'og' && (
              <div>
                <MetricCard>
                  <div className="header">ACTIVE OPENGRAPH METADATA</div>
                  <div className="value" style={{ fontSize: 14 }}>{ogData.title}</div>
                  <div style={{ fontSize: 11, color: '#B0B3B8', marginTop: 4 }}>
                    og:type = {ogData.type} • twitter:card = {ogData.twitterCard}
                  </div>
                </MetricCard>

                <h4 style={{ fontSize: 12, color: '#B0B3B8', margin: '16px 0 8px' }}>
                  LIVE SOCIAL PREVIEW SIMULATOR:
                </h4>

                <SocialPreviewBox>
                  <div className="preview-platform">WhatsApp / Facebook Link Preview</div>
                  <div className="preview-content">
                    <img src={ogData.image} alt="Preview" />
                    <div className="meta-url">{new URL(ogData.url).hostname}</div>
                    <h4>{ogData.title}</h4>
                    <p>{ogData.description}</p>
                  </div>
                </SocialPreviewBox>

                <SocialPreviewBox>
                  <div className="preview-platform">Twitter / X Summary Large Image Card</div>
                  <div className="preview-content">
                    <img src={ogData.image} alt="Preview" />
                    <h4>{ogData.title}</h4>
                    <p>{ogData.description}</p>
                    <div className="meta-url">tokopedia.com</div>
                  </div>
                </SocialPreviewBox>
              </div>
            )}
          </DrawerBody>
        </DrawerContainer>
      )}
    </>
  );
}
