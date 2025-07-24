import PFundLineChart from './PFundLineChart';
import PlayersTable from './PlayersTable';
import ItemsTable from './ItemsTable';
import styles from './Dashboard.module.scss';
import { TotalPFundComponent } from './TotalPFundComponent.tsx';
import { NewPlayerJoined } from './NewPlayerJoined.tsx';
import { PoolOpened } from './PoolOpened.tsx';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.topRow}>
        <div className={[styles.topSlot, styles.cardEffect].join(' ')}>
          <TotalPFundComponent />
        </div>
        <div className={[styles.topSlot, styles.cardEffect].join(' ')}>
          <NewPlayerJoined />
        </div>
        <div className={[styles.topSlot, styles.cardEffect].join(' ')}>
          <PoolOpened />
        </div>
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.bottomRightTable}>
          <div className={[styles.tableSlot, styles.cardEffect].join(' ')}>
            <PlayersTable />
          </div>
          <div className={[styles.tableSlot, styles.cardEffect].join(' ')}>
            <ItemsTable />
          </div>
        </div>
        <div className={[styles.chartSlot, styles.cardEffect].join(' ')}>
          <PFundLineChart />
        </div>
      </div>
    </div>
  );
}
